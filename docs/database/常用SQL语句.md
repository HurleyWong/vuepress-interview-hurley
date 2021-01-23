# 常用SQL语句

```SQL
// 创建数据库
create database db_name;
// 删除数据库
drop database db_name;
// 创建新表，包含主键tbl_id和name两个属性
create table tbl_name (tbl_id int(11 not null auto_increment, name varchar(255) default null, primary key(tbl_id)));
// 删除表
drop table tbl_name;
// 增加一个列
alter table tbl_name add column column_name type;
// 添加主键
alter table tbl_name add primary key(id);
// 删除主键（一个表只有一个主键，所以不需要指定名称或者某一列）
alter table tbl_name drop primary key;
// 创建外键（表已经创建）
alter table table1 add foreign key (id) references table2(id);
// 创建外键（定义多个列的外键约束）
alter table table1 add constraint fk_tbl1tbl2 foreign key (id) references table2(id);
// 撤销外键约束
alter table tbl_name drop foreign key fk_tbl1tbl2;
// 创建索引（[]为可选）
create [unique] index idx_name on tbl_name;
// 删除索引（索引是不可更改的，必须删除后重新创建）
drop index idx_name;
// 创建视图
create view view_name as select_statement;
// 删除视图
drop view view_name;
// 查询
select * from tbl_name where 查询条件;
// 插入
insert into tbl_name values(value1, value2);
// 插入（指定所要插入的数据的列）
insert into tbl_name (column1, column2) values (value1, value2);
// 删除
delete from tbl_name where 删除范围;
```