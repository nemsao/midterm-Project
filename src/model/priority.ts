class Priority {
  name:string
  order:number
  visible?:boolean
  constructor(name:string, order:number,visble:boolean=true) {
    this.name = name
    this.order = order
    this.visible=visble
  }

}

const priorities=[new Priority("Priority1",1),new Priority("Priority2",2) ,new Priority("Priority3",3),new Priority("Priority4",4)]

export {priorities,Priority}
