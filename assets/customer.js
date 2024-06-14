const selectors = {
    customerAddresses: '[data-customer-addresses]',
    addressCountrySelect: '[data-address-country-select]',
    addressContainer: '[data-address]',
    toggleAddressButton: 'button[aria-expanded]',
    cancelAddressButton: 'button[type="reset"]',
    deleteAddressButton: 'button[data-confirm-message]',
  };
  
  const attributes = {
    expanded: 'aria-expanded',
    confirmMessage: 'data-confirm-message',
  };
  
  class CustomerAddresses {
    constructor() {
      this.elements = this._getElements();
      if (Object.keys(this.elements).length === 0) return;
      this._setupCountries();
      this._setupEventListeners();
    }
  
    _getElements() {
      const container = document.querySelector(selectors.customerAddresses);
      return container
        ? {
            container,
            addressContainer: container.querySelector(selectors.addressContainer),
            toggleButtons: document.querySelectorAll(selectors.toggleAddressButton),
            cancelButtons: container.querySelectorAll(selectors.cancelAddressButton),
            deleteButtons: container.querySelectorAll(selectors.deleteAddressButton),
            countrySelects: container.querySelectorAll(selectors.addressCountrySelect),
          }
        : {};
    }
  
    _setupCountries() {
      if (Shopify && Shopify.CountryProvinceSelector) {
        // eslint-disable-next-line no-new
        new Shopify.CountryProvinceSelector('AddressCountryNew', 'AddressProvinceNew', {
          hideElement: 'AddressProvinceContainerNew',
        });
        this.elements.countrySelects.forEach((select) => {
          const formId = select.dataset.formId;
          // eslint-disable-next-line no-new
          new Shopify.CountryProvinceSelector(`AddressCountry_${formId}`, `AddressProvince_${formId}`, {
            hideElement: `AddressProvinceContainer_${formId}`,
          });
        });
      }
    }
  
    _setupEventListeners() {
      this.elements.toggleButtons.forEach((element) => {
        element.addEventListener('click', this._handleAddEditButtonClick);
      });
      this.elements.cancelButtons.forEach((element) => {
        element.addEventListener('click', this._handleCancelButtonClick);
      });
      this.elements.deleteButtons.forEach((element) => {
        element.addEventListener('click', this._handleDeleteButtonClick);
      });
    }
  
    _toggleExpanded(target) {
      target.setAttribute(attributes.expanded, (target.getAttribute(attributes.expanded) === 'false').toString());
      const addressContainer = this.elements.container.querySelectorAll('.addresses-form');
      addressContainer.forEach(block => {
        if(block.classList.contains('active') && block.getAttribute('id')!= target.getAttribute('aria-controls')){
          block.classList.remove('active');
        }else if(!block.classList.contains('active') && block.getAttribute('id') == target.getAttribute('aria-controls')){
          block.classList.add('active');
        }
  
        if(target.getAttribute('data-address-id')){
          const editForms = this.elements.container.querySelectorAll('#EditAddress form');
  
          
          editForms.forEach(item => {
            if(item.getAttribute('id').includes(target.getAttribute('data-address-id')) && !item.classList.contains('active')){
              item.classList.add('active');
            }else if(!item.getAttribute('id').includes(target.getAttribute('data-address-id')) && item.classList.contains('active')){
              item.classList.remove('active');
            }
          });
        }
      });
    }
  
    _handleAddEditButtonClick = ({ currentTarget }) => {
      this._toggleExpanded(currentTarget);
    };
  
    _handleCancelButtonClick = ({ currentTarget }) => {
      this._toggleExpanded(currentTarget);
    };
  
    _handleDeleteButtonClick = ({ currentTarget }) => {
      // eslint-disable-next-line no-alert
      if (confirm(currentTarget.getAttribute(attributes.confirmMessage))) {
        Shopify.postLink(currentTarget.dataset.target, {
          parameters: { _method: 'delete' },
        });
      }
    };
  }
  