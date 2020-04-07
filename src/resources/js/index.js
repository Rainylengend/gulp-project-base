class Demo {
  constructor() {
    this.a = 123
  }
  sayA() {
    console.log(this.a + 555);
    return 'result1'
  }
}

let d = new Demo()

console.log(d.sayA());
