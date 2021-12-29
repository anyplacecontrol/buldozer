import React from "react";
import PropTypes from "prop-types";

export class BudgetTableRow extends React.Component {
  render() {   

    return (
     
        <div className="table-tr">
        {/* -- NOTE: Add class '--show' to '.table-tr' when clicking on the 'button.toggle-box-title'-- */}
        {/* -- NOTE: Remove this class from another ".table-tr"'s-- */}
        <div className="table-td">
            <div className="toggle-box --main">
                <button className="toggle-box-title" type="button">Internet ресурсы</button>
                <div className="toggle-box-body">
                    <button className="toggle-box-btn" type="button">website.com / Платная реклама</button>
                    <button className="toggle-box-btn" type="button">website.com / PR-статья</button>
                    <button className="toggle-box-btn" type="button">website.com / Платная реклама</button>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </button>
                <div className="toggle-box-body">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </button>
                <div className="toggle-box-body">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">+₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">+₴9 999 999.99</div>
                        </div>
                    </div>
                </button>
                <div className="toggle-box-body">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">+₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">+₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">+₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">+₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">+₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">-₴9 999 999.99</div>
                            <div className="table-grid-item">+₴9 999 999.99</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </button>
                <div className="toggle-box-body">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </button>
                <div className="toggle-box-body">
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                    <div className="table-grid">
                        <div className="table-grid-inner">
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                            <div className="table-grid-item">₴9 999 999.99</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">Оплачено</button>
                <div className="toggle-box-body">
                    <div>Оплачено</div>
                    <div>Оплачено</div>
                    <div>Оплачено</div>
                </div>
            </div>
        </div>
        <div className="table-td">
            <div className="toggle-box">
                <button className="toggle-box-title" type="button">
                    <div className="text-ellipsis">Кучменко В.М.</div>
                </button>
                <div className="toggle-box-body">
                    <div className="text-ellipsis">Кучменко В.М.</div>
                    <div className="text-ellipsis">Кучменко В.М.</div>
                    <div className="text-ellipsis">Кучменко В.М.</div>
                </div>
            </div>
        </div>
    </div> 
    );
  }
}

BudgetTableRow.propTypes = {
 
};
