class Priority {
  id:string
  name:string
  order:number
  visible?:boolean
  constructor(id:string,name:string, order:number,visble:boolean=true) {
    this.id=id
    this.name = name
    this.order = order
    this.visible=visble
  }

}

const priorities=[new Priority("PO1","Priority1",1),new Priority("PO2","Priority2",2) ,new Priority("PO3","Priority3",3),new Priority("PO4","Priority4",4)]

export {priorities,Priority}
