# 设计模式



## 策略模式和工厂模式干掉if else

需求：开发一个计算保险的功能，不同的收入有不同的计算等级

``` java
public class IfElseDemo {

	public double calculateInsurance(double income) {
		if (income <= 10000) {
			return income * 0.365;
		}
		else if (income <= 30000) {
			return (income - 10000) * 0.2 + 35600;
		}
		else if (income <= 60000) {
			return (income - 30000) * 0.1 + 76500;
		}
		else {
			return (income - 60000) * 0.02 + 105600;
		}
	}

}
```

代码长，不容易维护，且不美观

**使用策略 + 工厂模式重构后的代码**

首先定义一个函数式接口

``` java
@FunctionalInterface
public interface InsuranceCalculator {

	/**
	 * 根据收入计算保险缴纳的金额
	 * @param income 收入
	 * @return 缴纳的保险金额
	 */
	double calculate(double income);

}
```



设计一个计算保险费用的工厂类，通过工厂类获取对应的策略。

``` java
public class InsuranceCalculatorFactory {

	public static final Map<String, InsuranceCalculator> CALCULATOR_MAP = new HashMap<>();

	static {
		CALCULATOR_MAP.put("first", income -> (income * 0.365));
		CALCULATOR_MAP.put("second", income -> (income - 10000) * 0.2 + 35600);
		CALCULATOR_MAP.put("third", income -> (income - 30000) * 0.1 + 76500);
		CALCULATOR_MAP.put("fourth", income -> (income - 60000) * 0.02 + 105600);
	}

	public static InsuranceCalculator getCalculator(String name) {
		return CALCULATOR_MAP.get(name);
	}

}
```

这种方式运行我们在运行时候根据需要选择不同的策略，而无需在代码中硬编码条件语句。

``` java
public class MyApp {

	public static void main(String[] args) {

		double income = 50000;

		InsuranceCalculator calculator = InsuranceCalculatorFactory.getCalculator("second");
		double insurance = calculator.calculate(income);
		System.out.println("保险的费用是：" + insurance);

	}

}
```

在正式编码中，可以将`Map`中的`Key`替换为枚举类型，限制调用者不能随便输入策略。
