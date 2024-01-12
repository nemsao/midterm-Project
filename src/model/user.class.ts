import { Entity, Column, PrimaryGeneratedColumn ,OneToMany, BaseEntity} from "typeorm"
import { Project } from "./project.class"

@Entity('User')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn({name:"id",type:"int"})
    id: number

    @Column({type:"varchar",name:"name"})
    name: string

    @Column({type:"varchar",name:"description"})
    description: string

    @Column({type:"varchar",name:"filename"})
    filename: string

    @Column({type:"varchar",name:"views"})
    views: number

    @Column({type:"varchar",name:"isPublished"})
    isActive: boolean
    @OneToMany(()=>Project,
    project=>project.user)
    project:Project[]

}