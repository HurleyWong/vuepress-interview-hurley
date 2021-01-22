# ContentProvider

> ContentProvider（内容提供者）是Android的四大组件之一，管理Android以结构化的方式存放的数据，以相对安全的方式封装数据（表）并且提供简易的处理机制和统一的访问接口给**其它应用程序**调用。不同的应用程序之间进行数据共享，它还可以选择只对哪一部分数据进行共享，从而保证程序中的隐私数据不会有泄漏风险。

* ContentProvider：管理数据，提供数据的增删改查操作，数据源可以是数据库、文件、XML、网络等，ContentProvider为这些数据的访问提供了统一的接口，可以用来做**进程间数据共享**。
* ContentResolver：ContentResolver可以不同URI操作不同的ContentProvider中的数据，外部进程可以通过ContentResolver与ContentProvider进行交互。
* ContentObserver：观察ContentProvider中的数据变化，并将变化通知给外界。