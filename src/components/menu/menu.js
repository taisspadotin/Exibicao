import React ,{ Component} from 'react';
import { Menu } from 'semantic-ui-react'
import './style.scss';
import {Link} from 'react-router-dom';

class Navegacao extends Component{
	state = {}

   
	render(){
		//console.log(this.props.ativo);
		let cadAtivo, busAtivo = false;
		if(this.props.ativo === 'cadastro'){
			cadAtivo=true;
		}
		if(this.props.ativo === 'buscar'){
			busAtivo=true;
		}
		return(
			<Menu stackable className="menu">
				<Menu.Item>
				  <img src='https://panoramafarmaceutico.com.br/wp-content/uploads/2020/01/icone-pessoa-png-4.png' style={{width: '25px', height: '25px'}}/>
				</Menu.Item>
				<Menu.Item
				  active={cadAtivo}
				  name='cadastro'
				  
				>
				<Link to='/'>Cadastro</Link>
				</Menu.Item>
				<Menu.Item
				  active={busAtivo}
				  name='buscar'
				  
				>
				<Link to='/buscar'>Buscar</Link>
				</Menu.Item>

				
			</Menu>
		)
	}
}
export default Navegacao;