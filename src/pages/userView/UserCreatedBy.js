import React from "react";
import { IUserView } from "../../redux/modules/userViewRedux";
import * as dataFuncs from "../../utils/dataFuncs";

export class UserCreatedBy extends React.Component {
  render() {    
    return (
      <div className="block-set__box flex animated">
        <div className="block-set__title animated">Кем добавлено</div>
        <div className="block-set__inner flex w100 animated">
          {/*------- Left panel-------- */}
          <div className="block-set__item flex animated">
            {/* ФИО */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                ФИО
              </div>
              <div className="block-set__content flex w100 animated">
                {this.props.user.createdUser.name}
              </div>
            </div>

            {/* Телефон */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                Телефон
              </div>
              <div className="block-set__content flex w100 animated">
                {this.props.user.createdUser.phone}
              </div>
            </div>

          </div>

          {/*------- Right panel-------- */}

          <div className="block-set__item flex animated">
           

            {/*  E-mail */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
                E-mail
              </div>
              <div className="block-set__content flex w100 animated">
                {this.props.user.createdUser.email}
              </div>
            </div>

            {/* Дата добавления */}
            <div className="block-set__item--inner flex w100 animated">
              <div className="block-set__sub-title flex w100 animated">
              Дата добавления
              </div>
              <div className="block-set__content flex w100 animated">
                {dataFuncs.truncateDate(this.props.user.createdDate)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserCreatedBy.propTypes = {
  user: IUserView,  
};
