import { React, Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, GridColumn, Input, Message, Grid } from 'semantic-ui-react';
import web3 from '../../../ethereum/web3';
import CampaignContract from '../../../ethereum/campaign';

class RequestNew extends Component {
    state = {
        description: '',
        requestAmountEth: '',
        recipientAddress: '',
        errorMessage: '',
        loading: false
    };

    static getInitialProps(props) {
        return {
            address: props.query.address
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({
            loading: true,
            errorMessage: ''
        });

        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = CampaignContract(this.props.address);
            await campaign.methods
                .createRequest(
                    this.state.description,
                    web3.utils.toWei(this.state.requestAmountEth, 'ether'),
                    this.state.recipientAddress
                )
                .send({
                    from: accounts[0]
            });

            // Router.pushRoute('/');
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return (
            <Layout>
                <h3>Create a Request</h3>
                <Grid>
                    <Grid.Column width={5}>
                        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                            <Form.Field>
                                <label>Description</label>
                                <Input
                                    value={this.state.description}
                                    onChange={event => this.setState({ description: event.target.value })}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Amount in Ether</label>
                                <Input
                                    label='eth'
                                    labelPosition='right'
                                    value={this.state.requestAmountEth}
                                    onChange={event => this.setState({ requestAmountEth: event.target.value })}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Recipient</label>
                                <Input
                                    value={this.state.recipientAddress}
                                    onChange={event => this.setState({ recipientAddress: event.target.value })}
                                />
                            </Form.Field>

                            <Message error header="Ooops!" content={this.state.errorMessage} />
                            <Button loading={this.state.loading} primary>Create!</Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default RequestNew;
