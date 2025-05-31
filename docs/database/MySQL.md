# MySQL

## 数据库引擎

## 数据类型

MySQL支持多种类型，大致可以分为三类：数值、日期/时间、字符串（字符）类型。所有数据类型详情可见：[MySQL数据类型](https://www.runoob.com/mysql/mysql-data-types.html)

1. `in`和`exist`的区别
2. `varchar`和`char`的区别
3. `varchar(50)`中50的含义
4. `int(20)`中20的含义
5. `int(10)`和`char(10)`和`varchar(10)`的区别

## 有关权限的表

MySQL服务器通过权限表来控制用户对数据库的访问，权限表存放在MySQL数据库里，由`mysql_install_db`脚本初始化。

* user权限表：记录允许连接到服务器的用户账号信息，里面的权限是全局级的；
* db权限表：记录各个账号在各个数据库上的操作权限；
* table_priv权限表：记录数据**表级**的操作权限；
* columns_priv权限表：记录数据**列级**的操作权限；
* host权限表：配合db权限表对给定主机上数据库级操作权限做更细致的控制，这个权限表不受`grant`和`revoke`语句的影响