

import * as React from 'react';
import { connect } from 'react-redux';

import { match } from 'react-router';
import { Link } from 'react-router-dom';
import { IProfileContractData } from 'src/models';
import { fetchContracts, fetchSignContract, ILoadContractsData } from 'src/redux/contractsSign/actions';
import { IRootState } from 'src/redux/store';


interface IContractsSignProps {
  userid: number;
  contractId: number;
  profileContract: IProfileContractData[];
  onloadContracts: (contractId: number) => void;
  loadContracts: ILoadContractsData;
  signContract: (sign: ISignResult) => void;
}

interface IContractsSignState {
  agree: boolean;
  disagree: boolean;
}

interface ISignResult {

  agree: boolean;
  disagree: boolean;
  contractId: number;
  userid: number;

}

class PureContractsSign extends React.Component<IContractsSignProps, IContractsSignState> {

  constructor(props: IContractsSignProps) {
    super(props);

    this.state = {
      agree: false,
      disagree: false
    }
  }

  public componentWillMount() {
    this.props.onloadContracts(this.props.contractId);
  }

  public render() {



    const loadContract = this.props.loadContracts






    return (
      <div className="static-modal">
        <div>The Contract To Be Signed </div>
        <div>Product: {loadContract.productName}</div>
        <div>Price: {loadContract.price}</div>
        <div>Participants: </div>
        <div>The First Participant:
                   <div>Name: {loadContract.participants[0].name}</div>
          <div>Percentage To Share: {loadContract.participants[0].percentageToShare}</div>
          <div>Day To Use: {loadContract.participants[0].daysToUse}</div>
        </div>
        <div>The Second Participant:
                   <div>Name: {loadContract.participants[1].name}</div>
          <div>Percentage To Share: {loadContract.participants[1].percentageToShare}</div>
          <div>Day To Use: {loadContract.participants[1].daysToUse}</div>
        </div>

        <div>The Third Participant:
                   <div>Name: {loadContract.participants[2].name}</div>
          <div>Percentage To Share: {loadContract.participants[2].percentageToShare}</div>
          <div>Day To Use: {loadContract.participants[2].daysToUse}</div>
        </div>
        <div>The Forth Participant:
                   <div>Name: {loadContract.participants[3].name}</div>
          <div>Percentage To Share: {loadContract.participants[3].percentageToShare}</div>
          <div>Day To Use: {loadContract.participants[3].daysToUse}</div>
        </div>
        <div>Description: {loadContract.description}</div>

        {
          (this.props.loadContracts) ? (
            <div>
              <label>Agree</label><input type="checkbox" checked={this.state.agree} onChange={this.handleAgreeChange} />
              <label>Disagree</label><input type="checkbox" checked={this.state.disagree} onChange={this.handleDisagreeChange} />
            </div>
          ) : ''
        }
        <Link to={'/profile'}>
          <button onClick={this.handleSign}>Sign</button>
        </Link>
      </div>
    )
  }

  private handleSign = (e: React.MouseEvent<HTMLButtonElement>) => {

    this.props.signContract({

      agree: this.state.agree,
      disagree: this.state.agree,
      // tslint:disable-next-line:object-literal-sort-keys
      contractId: this.props.contractId,
      userid: this.props.userid

    });

  }




  private handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // tslint:disable-next-line:no-unused-expression
      this.state.disagree === false
    }

    this.setState({
      agree: e.target.checked
    });
  }


  private handleDisagreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // tslint:disable-next-line:no-unused-expression
      this.state.agree === false
    }


    this.setState({
      disagree: e.target.checked
    });
  }


}



const mapStateToProps = (rootState: IRootState, ownProps: { match: match<{ id?: number }> }) => {
  const contract = rootState.profileContract.profileContract.find(c => {
    return c.contractId === Number(ownProps.match.params.id)
  }
  )

  return {

    // profileContract:rootState.profileContract.profileContract,
    // tslint:disable-next-line:object-literal-sort-keys
    contractId: (contract !== undefined) ? contract.contractId : undefined,
    loadContracts: rootState.loadContracts.loadContracts,
    userid: rootState.islogin.userid,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    onloadContracts: (contractId: number) => dispatch(fetchContracts(contractId)),
    signContract: (sign: ISignResult) => dispatch(fetchSignContract(
      sign.agree,
      sign.disagree,
      sign.contractId,
      sign.userid))
  };
}

const ContractsSign = connect(mapStateToProps, mapDispatchToProps)(PureContractsSign);

export default ContractsSign;