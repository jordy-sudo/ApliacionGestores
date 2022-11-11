import React from 'react';
import { Plugins } from '@capacitor/core';
import NetworkView from './NetworkView';
import ViewMessage from '../ViewMessage';

class NetworkContainer extends React.Component {
    handler: any;
    network: any;
    state: { networkStatus: string, connectedWithInternet: boolean }
    constructor(props: any) {
        super(props);
        this.state = {
            networkStatus: '',
            connectedWithInternet: false
        }
    }
    setNetworkListener() {
        this.handler = this.network.addListener('networkStatusChange', (status: any) => {
            this.setState({
                networkStatus: status.connectionType,
                connectedWithInternet: status.connected
            });
        });
    }
    async checkForConnection() {
        const { Network } = Plugins;
        this.network = Network;
        let status = await this.network.getStatus();
        this.setState({
            networkStatus: status.connectionType,
            connectedWithInternet: status.connected
        });
        this.setNetworkListener();
    }
    async componentDidMount() {
        this.checkForConnection();
    }
    componentWillUnmount() {
        this.handler.remove();
    }
    render() {
        return (
            <ViewMessage 
                networkStatus = {this.state.networkStatus}
                connectedWithInternet = {this.state.connectedWithInternet}
            />
        )
    }
}


export default NetworkContainer;