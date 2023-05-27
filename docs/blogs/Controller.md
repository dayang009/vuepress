



## 改造Controller层逻辑

统一返回值类型无论项目前后端是否分离都是非常必要的，方便对接接口的开发人员更加清晰地知道这个接口的调用是否成功（不能仅仅简单地看返回值是否为 `null` 就判断成功与否，因为有些接口的设计就是如此），使用一个状态码、状态信息就能清楚地了解接口调用情况



``` java
// 定义返回数据结构
public interface IResult {

	String getCode();

	String getMsg();

}
```

``` java

/**
 * 状态码枚举类
 * 常用结果的枚举
 */
@Getter
public enum ResultCodeEnum implements IResult {

	// @formatter:off
	/**
	 * 错误产生来源分为 A/B/C， 
	 * A 表示错误来源于用户，比如参数错误，用户安装版本过低，用户支付超时等问题；
	 * B 表示错误来源于当前系统，往往是业务逻辑出错，或程序健壮性差等问题；
	 * C 表示错误来源于第三方服务，比如 CDN 服务出错，消息投递超时等问题；
	 * 四位数字编号从 0001 到 9999，大类之间的步长间距预留 100
	 */
    SUCCESS("00000", "一切OK"),
    USER_ERROR("A0001", "用户端错误"),
    USER_REQ_PARAS_ERROR("A0400", "用户请求参数错误"),


    SYSTEM_RUN_ERROR("B0001", "系统执行出错"),
    SYSTEM_TIME_OUT("B0100", "系统执行超时"),
    SYSTEM_RESOURCE_ERROR("B0300", "系统资源异常"),

    CALL_SERVICE_ERROR("C0001", "调用第三方服务出错"),
    MIDDLEWARE_SERVICE_ERROR("C0100", "中间件服务出错"),
    RPC_SERVICE_ERROR("C0110", "RPC 服务出错"),
    OTHER_TIME_OUT("C0200", "第三方系统执行超时"),
    DB_SERVICE_ERROR("C0300", "数据库服务出错"),



    FAIL("600", "fail"),
    VALIDATE_ERROR("1002", "参数校验失败"),
    RESPONSE_PACK_ERROR("1003", "response返回包装失败"),
    APP_ERROR("2000", "业务异常"),
    PRICE_ERROR("2001", "价格异常"),
    SYSTEM_ERROR("5000", "网络错误，请稍后再试"),
    DATE_TIME_PARSE_ERROR("5001", "日期时间解析异常"),
    ;
    // @formatter:on

	private final String code;

	private final String msg;

	ResultCodeEnum(String code, String msg) {
		this.code = code;
		this.msg = msg;
	}

	@Override
	public String getCode() {
		return code;
	}

	@Override
	public String getMsg() {
		return msg;
	}

}

```



``` java

@Data
@Accessors(chain = true)
public class BaseResponse<T> implements Serializable {

	private static final long serialVersionUID = 5697795170240018136L;

	/**
	 * 状态码
	 */
	private String code;

	/**
	 * 提示信息
	 */
	private String msg;

	/**
	 * 传输的数据
	 */
	private transient T data;

	/**
	 * 空参构造器私有化，禁止外部实例化空对象
	 */
	private BaseResponse() {
	}

	/**
	 * 全参构造器，手动设置返回 VO
	 * @param code 状态码
	 * @param msg 消息
	 * @param data 数据
	 */
	public BaseResponse(String code, String msg, T data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	/**
	 * 默认返回成功状态码，数据对象
	 * @param data 数据
	 */
	public BaseResponse(T data) {
		this.code = ResultCodeEnum.SUCCESS.getCode();
		this.msg = ResultCodeEnum.SUCCESS.getMsg();
		this.data = data;
	}

	/**
	 * 返回指定状态码，数据对象
	 * @param resultCodeEnum 返回结果枚举类
	 * @param data 数据
	 */
	public BaseResponse(ResultCodeEnum resultCodeEnum, T data) {
		this.code = resultCodeEnum.getCode();
		this.msg = resultCodeEnum.getMsg();
		this.data = data;
	}

	/**
	 * 只返回状态码
	 * @param resultCodeEnum 返回结果枚举类
	 */
	public BaseResponse(ResultCodeEnum resultCodeEnum) {
		this.code = resultCodeEnum.getCode();
		this.msg = resultCodeEnum.getMsg();
		this.data = null;
	}

	public static <T> BaseResponse<T> success() {
		return new BaseResponse<T>().setCode(ResultCodeEnum.SUCCESS.getCode()).setMsg(ResultCodeEnum.SUCCESS.getMsg());
	}

	public static <T> BaseResponse<T> success(T data) {
		return new BaseResponse<T>().setCode(ResultCodeEnum.SUCCESS.getCode())
			.setMsg(ResultCodeEnum.SUCCESS.getMsg())
			.setData(data);
	}

	public static <T> BaseResponse<T> success(String msg, T data) {
		return new BaseResponse<T>().setCode(ResultCodeEnum.SUCCESS.getCode()).setMsg(msg).setData(data);
	}

	public static <T> BaseResponse<T> success(String code, String msg, T data) {
		return new BaseResponse<T>().setCode(code).setMsg(msg).setData(data);
	}

	public static <T> BaseResponse<T> fail() {
		return new BaseResponse<T>().setCode(ResultCodeEnum.FAIL.getCode()).setMsg(ResultCodeEnum.FAIL.getMsg());
	}

	public static <T> BaseResponse<T> fail(String msg) {
		return new BaseResponse<T>().setCode(ResultCodeEnum.FAIL.getCode()).setMsg(msg);
	}

	public static <T> BaseResponse<T> fail(T data) {
		return new BaseResponse<T>().setCode(ResultCodeEnum.FAIL.getCode())
			.setMsg(ResultCodeEnum.FAIL.getMsg())
			.setData(data);
	}

	public static <T> BaseResponse<T> fail(String msg, T data) {
		return new BaseResponse<T>().setCode(ResultCodeEnum.FAIL.getCode()).setMsg(msg).setData(data);
	}

	public static <T> BaseResponse<T> fail(String code, String msg, T data) {
		return new BaseResponse<T>().setCode(code).setMsg(msg).setData(data);
	}

	public static <T> BaseResponse<T> instance(String code, String msg, T data) {
		return new BaseResponse<T>().setCode(code).setMsg(msg).setData(data);
	}

}

```



## 统一包装处理

Spring 中提供了一个类 `ResponseBodyAdvice` ，能帮助我们实现上述需求

`ResponseBodyAdvice` 是对 Controller 返回的内容在 `HttpMessageConverter` 进行类型转换之前拦截，进行相应的处理操作后，再将结果返回给客户端。那这样就可以把统一包装的工作放到这个类里面。



































