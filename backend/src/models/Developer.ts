import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'developers' })
class Developer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sexo: string;

  @Column()
  idade: number;

  @Column()
  hobby: string;

  @Column({ name: 'data_nascimento' })
  dataNascimento: Date;
}

export default Developer;
