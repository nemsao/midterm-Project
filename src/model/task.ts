class task {
  name: string;
  description: string;
  color: string = "red" || "green";
  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

export { task };
