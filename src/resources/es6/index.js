class Demo {
  constructor() {
    this.a = 123
  }
  sayA() {
    console.log(this.a);
  }
}


let d = new Demo()

console.log(d.sayA());
