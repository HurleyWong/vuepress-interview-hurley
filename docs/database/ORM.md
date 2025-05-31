# ORM

ORM（Object Relational Mapping，对象关系映射）是一种思想，就是把对象（Object）转变成数据库中的记录，或者把数据库中的记录转变成对象。ORM通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。那么，在后端具体操作数据库时，就不需要编写复杂的SQL语句，而是向操作对象一样就可以了。

这里需要了解两个概念，持久化（Persistence）和持久层（Persistence layer）。持久化，是把数据（如内存中的对象）保存到可永久保存的存储设备中。而持久层，是专注于实现数据持久化应用领域的某个特定系统的一个逻辑层面，将数据使用者和数据实体相关联。

传统的使用JDBC操作数据库时，业务处理逻辑和数据存取逻辑是混淆在一起的。一般是如下几个步骤：

1. 建立数据库连接，获得`Connection`对象；
2. 根据用户的输入**组装**成SQL语句（复杂）；
3. 根据SQL语句建立`Statement`对象或者`PreparedStatement`对象；（`PreparedStatement是预编译的`，比`Statement`访问速度更快，代码的可读性和可维护性也更好）
4. 用`Connection`对象执行SQL语句，获得返回的结果集`ResultSet`对象；
5. 然后逐行读取结果集`ResultSet`对象中的数据；
6. 根据读取到的数据，按特定的业务逻辑进行操作；
7. 根据操作得到的结果再组装成新的SQL语句；
8. 再使用`Connection`对象执行更新的SQL语句去更新数据库中的数据；
9. 最后依次关闭`Statement`对象和建立连接的`Connection`对象；

从上可以看出，这个使用JDBC的逻辑是十分复杂的，除了上面的情况，还需要考虑到语句可能执行失败的处理逻辑。而如果使用ORM技术，例如流行的Hibernate或者MyBatis技术，业务逻辑会简化很多：

```Java
public Double calaAmount(String c_id, double amount) {
    // 根据id获取到Customer对象
    Customer customer = CustomerManager.getCustomer(id);
    // 根据顾客的等级获取相应的优惠政策
    Promo promo = PromoManager.getPromo(customer.getLevel());
    // 计算最终的价格
    customer.getAmount(customer.getAmount().add(amount));
    // 返回优惠后的价格
    return amount * promo.getRate();
}
```

以上就是业务逻辑的代码，可见是与数据存取逻辑完全分离的。数据存储逻辑等操作全部放在两个类中`CustomerManager`和`PromoManager`这两个类中完成。