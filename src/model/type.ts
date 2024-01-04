class type {
  name: string = "Feature";
  color: string = "red" || "green";
  visible: boolean = true || false;
  constructor(name: string, visible: boolean = true) {
    this.name = name;
    this.color = name === "Bug" ? "red" : "green";
    this.visible = visible;
  }
}

const types = [
  new type("Bug", true),
  new type("Bug", true),
  new type("Feature", true),
  new type("Feature", false),
];
export { types, type };
