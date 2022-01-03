import React from "react";
import PropTypes from "prop-types";
import { getValueByCurrency } from "../../utils/dataFuncs";

export class BudgetSelectedItem extends React.Component {
  render() {
    return (
      <div className="block-sets">
        <div className="block-set__box flex animated">
          <div className="block-set__title-box">
            <div className="block-set__title animated">Описание</div>
            <div className="buttons__right flex animated">
              <button
                className="buttons__main button--cancel animated"
                type="button"
              >
                Отменить
              </button>
              <button
                className="buttons__main button--save animated"
                type="button"
              >
                Сохранить
              </button>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="block-set__item flex animated">
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Категория затрат *
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="select animated" style={{zIndex: 6}}>
                    <div className="select__text animated">
                      Интернет ресурсы
                    </div>
                    <div className="select__list animated">
                      <div className="select__list--item animated">
                        Lorem ipsum.
                      </div>
                      <div className="select__list--item animated">
                        Incidunt, mollitia?
                      </div>
                      <div className="select__list--item animated">
                        Hic, quod?
                      </div>
                      <div className="select__list--item animated">
                        Tempora, unde.
                      </div>
                      <div className="select__list--item animated">
                        Nam, reprehenderit.
                      </div>
                      <div className="select__list--item animated">
                        Quisquam, totam.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Проявления *
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="select animated" style={{zIndex: 5}}>
                    <div className="select__text animated">Платная реклама</div>
                    <div className="select__list animated">
                      <div className="select__list--item animated">
                        Lorem ipsum.
                      </div>
                      <div className="select__list--item animated">
                        Incidunt, mollitia?
                      </div>
                      <div className="select__list--item animated">
                        Hic, quod?
                      </div>
                      <div className="select__list--item animated">
                        Tempora, unde.
                      </div>
                      <div className="select__list--item animated">
                        Nam, reprehenderit.
                      </div>
                      <div className="select__list--item animated">
                        Quisquam, totam.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Статья затрат *
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="select animated" style={{zIndex: 4}}>
                    <div className="select__text animated">Tripadvisor.com</div>
                    <div className="select__list animated">
                      <div className="select__list--item animated">
                        Lorem ipsum.
                      </div>
                      <div className="select__list--item animated">
                        Incidunt, mollitia?
                      </div>
                      <div className="select__list--item animated">
                        Hic, quod?
                      </div>
                      <div className="select__list--item animated">
                        Tempora, unde.
                      </div>
                      <div className="select__list--item animated">
                        Nam, reprehenderit.
                      </div>
                      <div className="select__list--item animated">
                        Quisquam, totam.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Активировать
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__tumbler animated"></div>
                    <div className="block-set__info--title animated">Yes</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-set__item flex animated">
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  ID *
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      123456678910111213141213
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Ответственный
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      artem@bulldozergroup.ua
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Статус оплаты
                </div>
                <div className="block-set__content flex w100 animated">
                  <div className="block-set__info flex animated">
                    <div className="block-set__info--title animated">
                      Не оплачено
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-set__item--inner flex w100 animated">
                <div className="block-set__sub-title flex w100 animated">
                  Комментарий
                </div>
                <div className="block-set__content flex w100 animated">
                  <textarea className="block-set__text-area"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">
              Бюджет статьи расходов
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-grid">
              <div className="payment-grid-inner">
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Сумма *</div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="15 000"
                      ></input>
                      <div className="brand-value-text">ГРН</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="5 000"
                      ></input>
                      <div className="brand-value-text">USD</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="0"
                      ></input>
                      <div className="brand-value-text">EUR</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="20 000"
                      ></input>
                      <div className="brand-value-text">ГРН (бартер)</div>
                    </div>
                  </div>
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Обновленная сумма</div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="20 000"
                      ></input>
                      <div className="brand-value-text">ГРН</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="0 000"
                      ></input>
                      <div className="brand-value-text">USD</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="0 000"
                      ></input>
                      <div className="brand-value-text">EUR</div>
                    </div>
                  </div>
                  <div className="block-set-grid">
                    <div className="block-set-grid-inner">
                      <input
                        className="block-set__input animated"
                        type="text"
                        value="30 000"
                      ></input>
                      <div className="brand-value-text">ГРН (бартер)</div>
                    </div>
                  </div>
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">Дата обновления суммы</div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="10 Окт, 2021, 14:38"
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="10 Окт, 2021, 14:38"
                  />
                </div>
                <div className="payment-grid-item">
                  <div className="brand-sub-title">
                    Сотрудник утвердивший обновление
                  </div>
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Кучменко Д.М."
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value=""
                  />
                  <input
                    className="block-set__input animated"
                    type="text"
                    value="Кучменко Д.М."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">
              Оплата статьи расходов
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-fields">
              <div className="payment-grid">
                <div className="payment-grid-inner">
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Оплаченная сумма</div>
                    <div className="block-set-grid">
                      <div className="block-set-grid-inner">
                        <input
                          className="block-set__input animated"
                          type="text"
                          value="10 000"
                        />
                        <div className="select animated" style={{zIndex: 5}}>
                          <div className="select__text animated">ГРН</div>
                          <div className="select__list animated">
                            <div className="select__list--item animated">
                              ГРН
                            </div>
                            <div className="select__list--item animated">
                              USD
                            </div>
                            <div className="select__list--item animated">
                              EUR
                            </div>
                            <div className="select__list--item animated">
                              ГРН (бартер)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block-set-grid">
                      <div className="block-set-grid-inner">
                        <input
                          className="block-set__input animated"
                          type="text"
                          value="3 000"
                        />
                        <div className="select animated" style={{zIndex: 4}}>
                          <div className="select__text animated">ГРН</div>
                          <div className="select__list animated">
                            <div className="select__list--item animated">
                              ГРН
                            </div>
                            <div className="select__list--item animated">
                              USD
                            </div>
                            <div className="select__list--item animated">
                              EUR
                            </div>
                            <div className="select__list--item animated">
                              ГРН (бартер)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Тип оплаты</div>
                    <div className="select animated" style={{zIndex: 3}}>
                      <div className="select__text animated">Наличными</div>
                      <div className="select__list animated">
                        <div className="select__list--item animated">
                          Lorem ipsum.
                        </div>
                        <div className="select__list--item animated">
                          Incidunt, mollitia?
                        </div>
                        <div className="select__list--item animated">
                          Hic, quod?
                        </div>
                        <div className="select__list--item animated">
                          Tempora, unde.
                        </div>
                        <div className="select__list--item animated">
                          Nam, reprehenderit.
                        </div>
                        <div className="select__list--item animated">
                          Quisquam, totam.
                        </div>
                      </div>
                    </div>
                    <div className="select animated" style={{zIndex: 2}}>
                      <div className="select__text animated">Наличными</div>
                      <div className="select__list animated">
                        <div className="select__list--item animated">
                          Lorem ipsum.
                        </div>
                        <div className="select__list--item animated">
                          Incidunt, mollitia?
                        </div>
                        <div className="select__list--item animated">
                          Hic, quod?
                        </div>
                        <div className="select__list--item animated">
                          Tempora, unde.
                        </div>
                        <div className="select__list--item animated">
                          Nam, reprehenderit.
                        </div>
                        <div className="select__list--item animated">
                          Quisquam, totam.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">Дата оплаты</div>
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="10 Окт, 2021, 14:38"
                    />
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="10 Окт, 2021, 14:38"
                    />
                  </div>
                  <div className="payment-grid-item">
                    <div className="brand-sub-title">
                      Сотрудник, получивший наличные
                    </div>
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="Кучменко Д.М."
                    />
                    <input
                      className="block-set__input animated"
                      type="text"
                      value="Кучменко Д.М."
                    />
                  </div>
                </div>
              </div>
              <button className="btn-secondary" type="button">
                + Добавить оплату
              </button>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="payment-info-list">
              <div className="payment-info-item">
                <div className="payment-info-title">Осталось оплатить:</div>
                <div className="payment-info-values">
                  <div className="payment-info-value">₴5 000</div>
                  <div className="payment-info-value">$2 000</div>
                  <div className="payment-info-value">€0</div>
                  <div className="payment-info-value">₴20 000 (бартер)</div>
                </div>
              </div>
              <div className="payment-info-item">
                <div className="payment-info-title">Всего оплачено:</div>
                <div className="payment-info-values">
                  <div className="payment-info-value">₴10 000</div>
                  <div className="payment-info-value">$3 000</div>
                  <div className="payment-info-value">€0</div>
                  <div className="payment-info-value">₴10 000 (бартер)</div>
                </div>
              </div>
            </div>
          </div>
          <div className="block-set__title-box">
            <div className="block-set__title animated">Приложения</div>
          </div>
          <div className="block-set__inner flex w100 animated">
            <div className="documents">
              <div className="document-box">
                <button className="document-remove" type="button"></button>
                <div className="document-item">
                  <div className="document-buttons">
                    <button className="document-button" type="button">
                      Удалить
                    </button>
                    <button className="document-button" type="button">
                      Скачать
                    </button>
                  </div>
                  <div className="document-title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Assumenda, soluta?
                  </div>
                </div>
              </div>
              <div className="document-box">
                <button className="document-remove" type="button"></button>
                <div className="document-item">
                  <div className="document-buttons">
                    <button className="document-button" type="button">
                      Удалить
                    </button>
                    <button className="document-button" type="button">
                      Скачать
                    </button>
                  </div>
                  <div className="document-title">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Possimus, unde.
                  </div>
                </div>
              </div>
              <div className="document-box">
                <input
                  className="document-add-input"
                  id="files"
                  type="file"
                  encType="multipart/form-data"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <label className="document-add" htmlFor="files">
                  <span className="document-add-icon"></span>
                  <span className="document-add-text">Загрузить</span>
                </label>
              </div>
            </div>
          </div>
          <div className="block-set__inner flex w100 animated --buttons">
            <div className="buttons__right flex animated">
              <button
                className="buttons__main button--cancel animated"
                type="button"
              >
                Отменить
              </button>
              <button
                className="buttons__main button--save animated"
                type="button"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
        {/* - On click show Add / Edit article form-- */}
        <div className="buttons__top flex w100 animated">
          <div className="buttons__right flex animated">
           
          </div>
        </div>
      </div>
    );
  }
}

BudgetSelectedItem.propTypes = {
  item: PropTypes.object
};
