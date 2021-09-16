import React from "react";
import PropTypesView from "prop-types";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import { hot } from "react-hot-loader";
import { ROUTE_NAMES } from "../../consts/routeNames";
import { SideBar } from "../SideBar/SideBar";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Backdrop } from "../../components/Backdrop/Backdrop";
import * as routing from "../../redux/modules/routingRedux";
import * as authRedux from "../../redux/modules/authRedux";

import {
  cards,
  certificates,
  restaurants,
  recipients,
  users,
  serviceTypes,
  statsIssuingRestaurants,
  statsRedeemerRestaurants,
  statsRecipients,
  statsUnusedCertificates,
  statsMutualSettlement,
  userRoles
} from "../../pages/tablePages/tablePages";
import { cardView } from "../../pages/cardView/cardView";
import { certificateView } from "../../pages/certificateView/certificateView";
import { recipientView } from "../../pages/recipientView/recipientView";
import { restaurantView } from "../../pages/restaurantView/restaurantView";
import { userView } from "../../pages/userView/userView";
import { serviceTypeView } from "../../pages/serviceTypeView/serviceTypeView";
import { login } from "../../pages/login/login";
import * as authApi from "../../api/authApi";

class App_ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authEmail: ""
    };
  }

  componentDidMount = async () => {
    await authApi.getToken();

    this.props.dispatch(authRedux.start_monitorClicks_Timer());
  };

  render() {
    let isAdmin = false;
    if (
      window.authData &&
      window.authData.user &&
      window.authData.user.role &&
      window.authData.user.role.id == 1
    )
      isAdmin = true;

    return (
      <>
        {//hack for electron for url from file://....index.html instead of http://localhost/
        window.location.pathname.includes("index.html") && (
          <div>
            <Redirect to="/" />
          </div>
        )}

        {this.props.isLoading && <Backdrop />}

        <Switch>
          {/* ------Login ----- */}
          <Route
            exact
            path={ROUTE_NAMES.login}
            render={() => {
              const Component = login;
              return <Component />;
            }}
          />

          {/* ------Any pages except login ----- */}
          <Route
            render={() => {
              return (
                <>
                  <div
                    id="wrapper"
                    className={this.props.isSidebarMinimized ? "active" : ""}
                  >
                    <SideBar isMinimized={this.props.isSidebarMinimized} />

                    {/* -- Main content container-- */}
                    <div className="site-middle animated">
                      <Header header={this.props.header} />

                      <div className="site-middle__inner ph-35 animated">
                        <Switch>
                          {/* ------Cards----- */}
                          <Route
                            path={ROUTE_NAMES.cards}
                            render={() => {
                              const Component = cards;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.cardView}
                            render={() => {
                              const Component = cardView;
                              return <Component />;
                            }}
                          />
                          {/* ------Certificates----- */}
                          <Route
                            path={ROUTE_NAMES.certificates}
                            render={() => {
                              const Component = certificates;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.certificateView}
                            render={() => {
                              const Component = certificateView;
                              return <Component />;
                            }}
                          />
                          {/* ------Restaurants ----- */}
                          <Route
                            path={ROUTE_NAMES.restaurants}
                            render={() => {
                              const Component = restaurants;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.restaurantView}
                            render={() => {
                              const Component = restaurantView;
                              return <Component />;
                            }}
                          />
                          {/* ------Recipients ----- */}
                          <Route
                            path={ROUTE_NAMES.recipients}
                            render={() => {
                              const Component = recipients;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.recipientView}
                            render={() => {
                              const Component = recipientView;
                              return <Component />;
                            }}
                          />
                          {/* ------ Users ----- */}
                          {isAdmin ? (
                            <Route
                              path={ROUTE_NAMES.users}
                              render={() => {
                                const Component = users;
                                return <Component />;
                              }}
                            />
                          ) : null}

                          <Route
                            path={ROUTE_NAMES.userView}
                            render={() => {
                              const Component = userView;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.userRoles}
                            render={() => {
                              const Component = userRoles;
                              return <Component />;
                            }}
                          />
                          {/* ------Виды услуг----- */}
                          <Route
                            path={ROUTE_NAMES.serviceTypes}
                            render={() => {
                              const Component = serviceTypes;
                              return <Component />;
                            }}
                          />
                          <Route
                            path={ROUTE_NAMES.serviceTypeView}
                            render={() => {
                              const Component = serviceTypeView;
                              return <Component />;
                            }}
                          />
                          {/* ------Статистика рест. эмитеты----- */}
                          <Route
                            path={ROUTE_NAMES.statsIssuingRestaurants}
                            render={() => {
                              const Component = statsIssuingRestaurants;
                              return <Component />;
                            }}
                          />
                          {/* ------Статистика рест. погас----- */}
                          <Route
                            path={ROUTE_NAMES.statsRedeemerRestaurants}
                            render={() => {
                              const Component = statsRedeemerRestaurants;
                              return <Component />;
                            }}
                          />
                          {/* ------Статистика контрагенты----- */}
                          <Route
                            path={ROUTE_NAMES.statsRecipients}
                            render={() => {
                              const Component = statsRecipients;
                              return <Component />;
                            }}
                          />
                          {/* ------Статистика unused certificates----- */}
                          <Route
                            path={ROUTE_NAMES.statsUnusedCertificates}
                            render={() => {
                              const Component = statsUnusedCertificates;
                              return <Component />;
                            }}
                          />
                          {/* ------Статистика взаиморасчет----- */}
                          <Route
                            path={ROUTE_NAMES.statsMutualSettlement}
                            render={() => {
                              const Component = statsMutualSettlement;
                              return <Component />;
                            }}
                          />                          
                        </Switch>
                      </div>
                    </div>
                  </div>

                  <Footer />
                </>
              );
            }}
          />
        </Switch>
      </>
    );
  }
}

App_.propTypes = {
  dispatch: PropTypesView.func.isRequired,
  currentPath: PropTypesView.string.isRequired,
  isLoading: PropTypesView.bool.isRequired,
  header: PropTypesView.object,
  isSidebarMinimized: PropTypesView.bool.isRequired
};

function mapStateToProps(state) {
  return {
    currentPath: state.router.location.pathname,
    isLoading: state.ui.isLoading,
    isSidebarMinimized: state.ui.isSidebarMinimized,
    header: routing.getHeader(state)
  };
}

export const ConnectedApp = connect(mapStateToProps)(App_);

export default hot(module)(ConnectedApp);
