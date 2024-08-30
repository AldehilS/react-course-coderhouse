export class NavOption {
  constructor(name, route = '/', options = []) {
    this.name = name;
    this.route = route;
    this.options = options;
  }
}