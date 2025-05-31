# SQL语句种类

* DDL(Data Definition Language)：数据定义语言，定义对数据库对象（库、表、列、索引）的操作，比如有`create`、`drop`、`alter`、`rename`、`truncate`等命令；
* DML(Data Manipulation Language)：数据操作语言，定义对数据库记录的操作，代表指令有`insert`、`delete`、`update`、`select`等命令；
* DCL(Data Control Language)：数据控制语言，定义对数据库、表、字段、用户的访问权限和安全级别。代表指令有`grant`、`revoke`、`commit`、`rollback`、`savepoint`等命令。

## DEOP、DELETE和TRUNCATE的区别

`drop table`：

1. 属于DDL
2. 不可回滚
3. 不可以接`where`
4. 表的内容和结构都被删除
5. 删除的速度快

`truncate table`：

1. 属于DDL
2. 不可回滚
3. 不可以接`where`
4. 只删除表的内容
5. 删除的速度快

`delete from`：

1. 属于DML
2. 可以回滚
3. 可以接`where`
4. 表的结构还在，表的内容是否在要取决于`where`执行的情况
5. 删除的速度慢，需要逐行删除

**使用场景**：

* 当不再需要一张表的时候，就用`drop`命令
* 只想删除表中部分数据行时，用`delete`命令，并且需要带上`where`子句
* 保留表的结构但是删除所有的数据要用`truncate`命令