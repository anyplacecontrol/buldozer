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
  //------------

  renderRecipientsSelectBox = () => {
    let itemsArr = this.props.allRecipients.map((recipient, index) => {
      let isChecked = false;
      if (this.props.user.recipients) {
        for (
          let i = 0;
          i < this.props.user.recipients.length;
          i++
        ) {
          if (
            this.props.user.recipients[i].id === recipient.id
          ) {
            isChecked = true;
            break;
          }
        }
      }
      
      return {
        text: recipient.company,
        isChecked,
        onClick: () =>
          this.props.onChangeRecipient(recipient, isChecked)
      };
    });

    return (
      <SelectBox
        style={{ zIndex: 3 }}
        className="w100"
        text={"Выбрать..."}
        items={[...itemsArr]}
        isCheckboxItems
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

          <div className="block-set__item flex animated">
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Контрагенты
              </div>
              
              <div className="block-set__content flex w100 animated">
               
               <div className="block-set__content flex w100 animated">
                 <div
                   className="block-set__info flex animated"
                   style={{ marginBottom: "10px" }}
                 >
                   <div
                     className={
                       this.props.user.useAllRecipients
                         ? "block-set__tumbler active animated"
                         : "block-set__tumbler animated"
                     }
                     onClick={this.props.onTriggerAllRecipients}
                   />
                   <div className="block-set__info--title animated">
                     {"Все"}
                   </div>
                 </div>
               </div>
               {this.props.user.useAllRecipients
                 ? null
                 : this.renderRecipientsSelectBox()}
             </div>           

            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserPermissions.propTypes = {  
  allUserRoles: PropTypes.arrayOf(PropTypes.object).isRequired,
  allRecipients: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: userViewRedux.IUserView,
  onChangeRole: PropTypes.func.isRequired,
  onChangeRecipient: PropTypes.func.isRequired,
  onTriggerAllRecipients: PropTypes.func.isRequired,
};
