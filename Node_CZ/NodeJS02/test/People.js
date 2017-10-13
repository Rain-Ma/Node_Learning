function People(name, sex, age) {
  this.name = name;
  this.sex = sex;
  this.age = age;
}

People.prototype = {
  sayHello: function () {
    console.log(this.name + this.sex + this.age);
  }
};

// exports = People; // 错误, 无法向外界提供People接口, 提供的是{}

// 此时, People就被十位构造函数, 可以用new来实例化.
module.exports = People; // 推荐方法

// exports.Human = People; // 可行, 但是形式很怪异.









