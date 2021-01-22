# MVC与MVP与MVVM

## MVC

> MVC用一种业务逻辑、数据、界面显示分离的方法组织代码。

Android中的MVC的角色定义如下：

* 模型层Model：针对业务模型，建立的数据结构和相关的类，可以被理解为是Model。Model与View是无关的，而是与业务相关的。
* 视图层View：一般采用XML文件或者Java代码进行界面的描述。
* 控制层Controller：Android的控制层通常在Activity、Fragment或者由它们控制的其它业务类中。

MVC简单来说就是「通过Controller来操作Model层的数据，并且返回给View层展示」。

MVC的缺点是：

* Android中的Activity或者Fragment并不是一个标准MVC模式中的Controller。随着界面及其逻辑的复杂度不断提升，Activity类的职责也在不断的增加，会变得十分的庞大臃肿。
* View层和Model层相互耦合，不易于开发和维护。

## MVP

在MVP里，Presenter完全将Model和View层进行了分离，把主要的程序逻辑都放在了Presenter里实现。Presenter与具体的View是没有直接关联的，而是通过定义好的接口进行交互，这样变更View时可以保持Presenter的不变。

View层里只有`get`/`set`方法，以及用户输入和设置界面显示的代码，除此之外就没有别的内容了，因为主要的逻辑就放在了Presenter层里实现。

* Model：主要提供数据的存取功能，Preseter层需要通过Model层来存储和获取数据；
* View：负责处理用户事件和视图的展示，Android中对应的是Activity或者Fragment或者某个View；
* Presenter：作为View和Model层之间的桥梁。它从Model层获取数据并显示在View层中，使得View和Model层之间没有耦合。

## MVVM

将Presenter改为ViewModel，不同的是ViewModel与Model和View是双向绑定的。当View发生改变时，ViewModel通知Model进行更新数据；而Model更新之后，ViewModel也会通知View层更新界面。

通过Data Binding，可以通过声明式布局的方式精简代码来绑定应用程序的逻辑和布局。