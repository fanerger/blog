# typescript基础

### 基础类型
```ts
let notSure: any = 4;
let name: string = "bob";
let age: number = 37;
let isDone: boolean = false;
let unusable: void = undefined;

let list: number[] = [1, 2, 3];
// 数组泛型，Array<元素类型>：
let list: Array<number> = [1, 2, 3];

// 联合类型（Union Types）表示取值可以为多种类型中的一种。
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

```

* * *

### 元组
元组类型允许表示**一个已知元素数量和类型的数组**，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
```ts
// Declare a tuple type 
let x: [string, number]; 

x = ['hello', 10]; // OK 
x = [10, 'hello']; // Error
```

* * *

### 接口 interface / implements
在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（**implements**）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
```ts
// 约束了 tom 的形状必须和接口 Person 一致。
interface Person {
    name: string;
    age?: number;
}
let tom: Person = {
    name: 'Tom',
    age: 25
};
```
```ts
// 类实现接口 (可实现多个)
interface Alarm {
    alert();
}
interface Light {
    lightOn();
    lightOff();
}
class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}
```

**接口与接口之间可以是继承关系：**
```ts
interface Alarm {
    alert();
}
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}
```
```ts
// 限制 props.color 的值只可以是字符串 red、blue、yellow 。
interface IProps {
color: 'red' | 'blue' | 'yellow',
}

export interface MyStore {
    language: string;
    country: string;
    auth: {
        authenticated: boolean;
        username?: string;
     };
}
```
* * *
### 类型别名 type
类型别名用来给一个类型起个新名字。 类型别名常用于联合类型。
类型别名不能被 extends和 implements
如果你无法通过接口来描述一个类型并且需要使用联合类型或元组类型，这时通常会使用类型别名。（其他情况尽量去使用接口代替类型别名。）

使用 **type** 创建类型别名。
```ts
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

* * *

### 交叉类型&     
**交叉类型**是将多个类型合并为一个类型。 这让我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如， Person & Serializable & Loggable同时是 Person 和 Serializable 和 Loggable。 **就是说这个类型的对象同时拥有了这三种类型的成员。**

* * *
### 联合类型 |
**联合类型**表示一个值可以是几种类型之一。 我们用竖线（ |）分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean。如果一个值是联合类型，**我们只能访问此联合类型的所有类型里共有的成员。**
```ts
// 联合类型
interface Bird { 
    fly(); 
    layEggs();
} 
interface Fish { 
    swim(); 
    layEggs(); 
} 
function getSmallPet(): Fish | Bird { 
    // ...
} 
let pet = getSmallPet(); 
pet.layEggs(); // okay 
pet.swim(); // errors
```
* * *
### 泛型 <>
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
```ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}
createArray<string>(3, 'x'); // ['x', 'x', 'x']

//泛型类
class GenericNumber<T> { zeroValue: T; add: (x: T, y: T) => T; } let myGenericNumber = new GenericNumber<number>(); myGenericNumber.zeroValue = 0; myGenericNumber.add = function(x, y) { return x + y; };
```

* * *
### 类 class
* **public** 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
* **private** 修饰的属性或方法是私有的，不能在声明它的类的外部访问
* **protected** 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
*  **readonly** 只读属性关键字，只允许出现在属性声明或索引签名中。


* * *

### 声明 declare 
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

**declare var 声明全局变量
declare function 声明全局方法
declare class 声明全局类
declare enum 声明全局枚举类型
declare namespace 声明全局对象（含有子属性）interface 和 type 声明全局类型**

* * *
### 类型断言
语法：在需要断言的变量前加上 `<Type>` 即可
```ts
// 使用类型断言，将 something 断言成 string：
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

#### typescript 类型映射 （ReadOnly、Partial）