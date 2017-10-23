# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table avatar (
  id                            integer auto_increment not null,
  user_id                       bigint,
  content_type                  varchar(255),
  data                          longblob,
  constraint uq_avatar_user_id unique (user_id),
  constraint pk_avatar primary key (id)
);

create table company (
  id                            bigint auto_increment not null,
  name                          varchar(255),
  constraint pk_company primary key (id)
);

create table computer (
  id                            bigint auto_increment not null,
  name                          varchar(255),
  introduced                    datetime(6),
  discontinued                  datetime(6),
  company_id                    bigint,
  constraint pk_computer primary key (id)
);

create table role (
  id                            integer auto_increment not null,
  name                          varchar(255),
  constraint pk_role primary key (id)
);

create table stock (
  id                            bigint auto_increment not null,
  code                          varchar(255),
  name                          varchar(255),
  simple_name                   varchar(255),
  constraint pk_stock primary key (id)
);

create table user (
  id                            bigint auto_increment not null,
  mobile                        bigint not null,
  level                         integer not null,
  email                         varchar(255),
  op_style_a                    varchar(255),
  op_style_b                    varchar(255),
  total_profit                  varchar(255),
  department                    varchar(255),
  analyst_cid                   varchar(255),
  analyst_desc                  varchar(255),
  beiyong1                      varchar(255),
  stock_order                   varchar(255),
  image_url                     varchar(255),
  name                          varchar(255),
  password                      varchar(255),
  update_time                   datetime(6),
  mid                           varchar(255),
  avatar_id                     integer,
  role_id                       integer,
  create_time                   datetime(6) not null,
  constraint uq_user_avatar_id unique (avatar_id),
  constraint pk_user primary key (id)
);

create table user_stock (
  user_id                       bigint not null,
  stock_id                      bigint not null,
  constraint pk_user_stock primary key (user_id,stock_id)
);

alter table avatar add constraint fk_avatar_user_id foreign key (user_id) references user (id) on delete restrict on update restrict;

alter table computer add constraint fk_computer_company_id foreign key (company_id) references company (id) on delete restrict on update restrict;
create index ix_computer_company_id on computer (company_id);

alter table user add constraint fk_user_avatar_id foreign key (avatar_id) references avatar (id) on delete restrict on update restrict;

alter table user add constraint fk_user_role_id foreign key (role_id) references role (id) on delete restrict on update restrict;
create index ix_user_role_id on user (role_id);

alter table user_stock add constraint fk_user_stock_user foreign key (user_id) references user (id) on delete restrict on update restrict;
create index ix_user_stock_user on user_stock (user_id);

alter table user_stock add constraint fk_user_stock_stock foreign key (stock_id) references stock (id) on delete restrict on update restrict;
create index ix_user_stock_stock on user_stock (stock_id);


# --- !Downs

alter table avatar drop foreign key fk_avatar_user_id;

alter table computer drop foreign key fk_computer_company_id;
drop index ix_computer_company_id on computer;

alter table user drop foreign key fk_user_avatar_id;

alter table user drop foreign key fk_user_role_id;
drop index ix_user_role_id on user;

alter table user_stock drop foreign key fk_user_stock_user;
drop index ix_user_stock_user on user_stock;

alter table user_stock drop foreign key fk_user_stock_stock;
drop index ix_user_stock_stock on user_stock;

drop table if exists avatar;

drop table if exists company;

drop table if exists computer;

drop table if exists role;

drop table if exists stock;

drop table if exists user;

drop table if exists user_stock;

