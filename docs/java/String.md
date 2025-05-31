# String

## String和StringBuffer和StringBuilder的区别

三者都是`final`类，都是不允许被继承的。

### 可变性

`String`类中是使用`final`关键字修饰字节（字符，取决于JDK版本）数组来保存字符串，所以`String`对象是**不可变的**。`StringBuilder`与`StringBuffer`都继承自`AbstractStringBuilder`类，在`AbstractStringBuilder`中没有用`final`关键字修饰，所以这两种对象是**可变的**。

### 线程安全性

**`String`中的对象是不可变的**，也可以理解为常量，**线程安全**。

`StringBuffer`中的所有方法都添加了同步锁`synchronized`关键字或者对调用的方法加了同步锁，所以是**线程安全**的。

`StringBuilder`并没有对方法进行加同步锁，所以是**非线程安全**的。

### 性能

每次对`String`类型进行改变时，都会生成一个新的`String`对象，然后将指针指向新的`String`对象。

`StringBuffer`每次都会对`StringBuffer`对象本身进行操作，而不是生成新的对象并改变对象引用。相同情况下使用`StringBuilder`相比使用`StringBuffer`能获得10%~15%左右的性能提升，但是要冒线程不安全的风险。

### 总结

1. 操作**少量数据**：适用`String`
2. **单线程**操作字符串缓冲区下操作大量数据：适用`StringBuilder`
3. **多线程**操作字符串缓冲区下操作大量数据：适用`StringBuffer`