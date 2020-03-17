import React ,{ Component} from 'react';
import Menu from '../../components/menu/menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton, showTable, GuardaDados} from '../../actions';
import {Table, Message} from 'semantic-ui-react';

class Buscar extends Component{
	render(){
		console.log(this.props.dados);
		console.log(this.props.dados.length);
		let listagem = '';
		if(this.props.dados.length > 0){
			let resposta = this.props.dados.length+' registro encontrado!';
			if(this.props.dados.length > 1){
				resposta = this.props.dados.length+' registros encontrados!';
			}
			listagem = 
			<>
			<Message positive>
				<Message.Header>{resposta}</Message.Header>
				
			  </Message>
			<br/>
			<Table celled fixed singleLine>
			<Table.Header>
			  <Table.Row>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<Table.HeaderCell>User</Table.HeaderCell>
				<Table.HeaderCell>Email</Table.HeaderCell>
			  </Table.Row>
			</Table.Header>

			<Table.Body>
			{this.props.dados.map((row)=>
			  <Table.Row key={row.nome}>
				<Table.Cell>{row.nome}</Table.Cell>
				<Table.Cell>{row.user}</Table.Cell>
				<Table.Cell>{row.email}</Table.Cell>
			  </Table.Row>
			)}
			</Table.Body>
		  </Table>
		  </>;
		}
		else{
			listagem = 
			<Message negative>
			 <Message.Header>Nenhum registro encontrado!</Message.Header>
			 <p>Você precisa adicionar um registro na tela de listagem primeiro!</p>
			</Message>;
		}
		return(
		<>
			<Menu ativo="buscar"/>
			<div className="App">
			{listagem}
			</div>
		</>
		)
	}
}
const mapStateToProps = store => ({
  newValue: store.clickState.newValue,
  showTb:   store.TableState.showTb,
  dados:    store.TableState.dados
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ clickButton, showTable, GuardaDados}, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Buscar);