import React ,{ Component} from 'react';
import Menu from '../../components/menu/menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButton, showTable, GuardaDados} from '../../actions';
import {Table, Message, Button} from 'semantic-ui-react';
import axios, {serviceUrl, onSuccess,onFailure} from 'axios';

class Buscar extends Component{
	constructor(props){
		super(props);
	}
	state = {
		registros: []
	}
	componentDidMount() {
		axios.defaults.baseURL = 'http://localhost:3001/cadastro';
		axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.get(serviceUrl, onSuccess, onFailure)
		
		.then(resp => {
			let d = (resp.data);
			this.setState({registros: d})
			//console.log(resp.data);
			
		})
		.catch(error => {
			console.log(error);
		})
	}
	deletar = (id) =>{
		axios.delete(`http://localhost:3001/cadastro`, {params: {id: id}})
		.then(resp =>{
			alert(resp.data.message);
			document.location.reload();
		});
	}
	render(){
		//console.log(this.props.dados);
		//console.log(this.props.dados.length);
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
		
		let registroBanco = '';
		registroBanco = <>
			<Table celled fixed singleLine>
			<Table.Header>
			  <Table.Row>
				<Table.HeaderCell>Nome</Table.HeaderCell>
				<Table.HeaderCell>Usuario</Table.HeaderCell>
				<Table.HeaderCell></Table.HeaderCell>
			  </Table.Row>
			</Table.Header>
			<Table.Body>
			{this.state.registros.map((row)=>
			  <Table.Row key={row._id}>
			    <Table.Cell>{row.nome}</Table.Cell>
				<Table.Cell>{row.user}</Table.Cell>
				<Table.Cell><Button style={{width:'50px'}} onClick={()=>this.deletar(row._id)}><i className="trash icon"></i></Button></Table.Cell>
			  </Table.Row>
			)}
			</Table.Body>
		  </Table>
		  </>;
		
		return(
		<>
			<Menu ativo="buscar"/>
			<div className="App">
			{listagem}
			{registroBanco}
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