import React from "react";
import PropTypes from "prop-types";
import * as consts from "../../consts/constants";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import * as userViewRedux from "../../redux/modules/userViewRedux";

export class UserPermissions extends React.Component {
  renderRolesSelectBox = () => {
    let itemsArr = this.props.allUserRoles.map((role, index) => {
      return {
        text: role.name,
        onClick: () => this.props.onChangeRole(role)
      };
    });

    let currentText;
    if (this.props.user.role != null) currentText = this.props.user.role.name;
    else currentText = consts.chooseStr;

    return (
      <SelectBox
        style={{ zIndex: 3 }}
        className="w100"
        text={currentText}
        items={[...itemsArr]}
      />
    );
  };

  render() {
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Доступ</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* -- Role -- */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Роль*
              </div>
              <div className="block-set__content flex w100 animated">
                {this.renderRolesSelectBox()}
              </div>
            </div>
          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated"></div>
        </div>
      </div>
    );
  }
}

UserPermissions.propTypes = {
  allUserRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: userViewRedux.IUserView,
  onChangeRole: PropTypes.func.isRequired
};
