
import * as React from 'react';
import { connect } from 'react-redux';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IContracts } from 'src/models';
import { IRootState } from 'src/redux/store';

// import { IRootState } from 'src/redux/store';


interface IContractsList{

    contracts:IContracts[];

}

class PureContractsList extends React.Component<IContractsList> {

    constructor (props: IContractsList){
        super (props);

    }



    public render(){

        const contracts = this.props.contracts;

  
      return (
  
        <div>
  
          <h2> Contracts List </h2>

           <table>

               <thead>
                   <tr>
                   <th>Contract ID </th> 
                   <th>Contracts For</th>
                   <th>Participants</th>  
                   <th>Actions</th>
                   </tr>

                </thead>

               <tbody>

                   {
                    
                        contracts.map(contract => (
                        <tr key={contract.id}>
                            <td>{contract.id}</td>
                            <td>{contract.product}</td>
                            <td>{contract.participants[0].participantName},{contract.participants[1].participantName},{contract.participants[2].participantName},{contract.participants[3].participantName}</td>
                            <td><Link to = {`/contracts/${contract.id}`}>Edit</Link></td>
                        
                        </tr>
                       ))

                   }
                
                </tbody>

            </table>

            <Link to ="/contracts/add"> Creat a Contract</Link>
  
        </div>
  
  
      );
    }
  }

  const ContractsList = connect((rootState:IRootState) =>({

    contracts:rootState.contracts.contracts

  }))(PureContractsList);

  // tslint:disable-next-line:no-unused-expression
  export default ContractsList;






  

  