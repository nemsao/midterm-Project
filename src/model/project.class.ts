import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn ,BaseEntity} from "typeorm"
import { User } from "./user.class"
@Entity('Proejct')
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column({type:"varchar",name:"name"})
    name: string

    @Column({type:"varchar",name:"description"})
    description: string
    @Column({type:"int",name:"status",})
    status: number
    @Column({type:"varchar",name:"filename"})
    filename: string
    @ManyToOne(()=>User,
       user=>user.project
     )
    @JoinColumn({name:"userId"})
    user: User

    
}