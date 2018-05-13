import React, { Component } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      tenants: []
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    try {
      const res = await this.tenants();
      this.setState({ tenants: res.tenants });
    } catch (e) {
      alert(e);
    }

    this.setState({ isLoading: false });
  }

  tenants() {
    return API.post("tenants", "/tenants", { body: {}});
  }

  handleTenantClick = event => {
    event.preventDefault();
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }

  renderTenantsList(tenants) {
    return [{}].concat(tenants).map(
      (tenant, i) =>
        i !== 0
          ? <ListGroupItem
              key={tenant.tenantId}
              href={`/tenants/${tenant.tenantName}`}
              onClick={this.handleTenantClick}
              header={tenant.tenantName.trim().split("\n")[0]}
            >
              {"Created: " + new Date(tenant.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/tenants/new"
              onClick={this.handleTenantClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Create a new tenant
              </h4>
            </ListGroupItem>
    );
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  renderTenants() {
    return (
      <div className="tenants">
        <PageHeader>Your Tenants</PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderTenantsList(this.state.tenants)}
        </ListGroup>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderTenants() : this.renderLander()}
      </div>
    );
  }
}
