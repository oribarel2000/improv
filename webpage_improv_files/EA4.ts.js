var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class DiscountByCardNumber {
    constructor() {
        this.binList = [
            new BunTypes(0, '11', "0", 2, 45800000, 45800000),
            new BunTypes(0, '11', "0", 2, 36409460, 36409460),
            new BunTypes(0, '11', "0", 2, 36409463, 36409463),
            new BunTypes(0, '11', "0", 2, 36409464, 36409464),
            new BunTypes(0, '11', "0", 2, 36409465, 36409465),
            new BunTypes(0, '11', "0", 2, 36409466, 36409466),
            new BunTypes(0, '11', "0", 2, 36437000, 36437099),
            new BunTypes(0, '11', "0", 2, 36556760, 36556760),
            new BunTypes(0, '11', "0", 2, 36556763, 36556763),
            new BunTypes(0, '11', "0", 2, 36556764, 36556764),
            new BunTypes(0, '11', "0", 2, 45800600, 45800699),
            new BunTypes(0, '11', "0", 2, 45801600, 45801699),
            new BunTypes(0, '11', "0", 2, 45802600, 45802699),
            new BunTypes(0, '11', "0", 2, 45808000, 45808099),
            new BunTypes(0, '11', "0", 2, 45808600, 45808699),
            new BunTypes(0, '11', "0", 2, 45809600, 45809699),
            new BunTypes(0, '11', "0", 2, 51898900, 51898999),
            new BunTypes(0, '11', "0", 2, 51899100, 51899199),
            new BunTypes(0, '11', "0", 2, 53640700, 53640700),
            new BunTypes(0, '11', "0", 2, 53640710, 53640710),
            new BunTypes(0, '11', "0", 2, 53640750, 53640750),
            new BunTypes(0, '11', "0", 2, 53640760, 53640760),
            new BunTypes(0, '11', "0", 2, 54513700, 54513700),
            new BunTypes(0, '11', "0", 2, 54771400, 54771499),
            new BunTypes(0, '11', "0", 2, 55218400, 55218400),
            new BunTypes(0, '11', "0", 2, 55251600, 55251600),
            new BunTypes(0, '11', "0", 2, 55595600, 55595600),
            new BunTypes(0, '11', "0", 2, 67667000, 67667000)
        ];
    }
    GetKuponDiscount(cardnumber) {
        if (cardnumber == null || cardnumber == undefined || cardnumber.length == 0)
            return null;
        let prefix = parseInt(cardnumber.substring(0, 8).trim());
        for (var i = 0, len = this.binList.length; i < len; i++) {
            var f = this.binList[i].FromCard;
            var t = this.binList[i].ToCard;
            if (prefix >= f && prefix <= t)
                return "כרטיס דיסקונט";
        }
        return null;
    }
}
class BunTypes {
    constructor(Id = 0, Name = '', BinInfo = '', ChackType = 0, FromCard = 0, ToCard = 0) {
        this.Id = Id;
        this.Name = Name;
        this.BinInfo = BinInfo;
        this.ChackType = ChackType;
        this.FromCard = FromCard;
        this.ToCard = ToCard;
    }
}
class ManagerBase {
    constructor(params) {
        var _a, _b;
        this.lang = langs.lan;
        this._3DSecureService = new Cardcom3DSecureService();
        this.controlsToShow = ko.observableArray();
        this.ShowApprovecommition = false;
        this.creditCardPayment = ko.observable();
        this.invoiceToInformation = ko.observable();
        this.dealInfo = ko.observable();
        this.customFields = ko.observable();
        this.error = ko.observable();
        this.SuccessRedirectUrl = '';
        this.ErrorRedirectUrl = '';
        this.UID = '';
        this.ReturnData = '';
        this.IsError = false;
        this.NumOfRetriesAllowed = 5;
        this.controllerArray = [];
        this.isToSowDealInfo = ko.observable(false);
        this.IsToShowInvoice = ko.observable(false);
        this.isWizard = ko.observable(false);
        this.ModalHeader = ko.observable();
        this.CreditCardModalVisible = ko.observable(true);
        this.InvoiceModalVisible = ko.observable(false);
        this.DealInfoModalVisible = ko.observable(true);
        this.CustomFieldsModalVisible = ko.observable(true);
        this.PayBtnVisible = ko.observable(true);
        this.NextBtnVisible = ko.observable(false);
        this.PreviousBtnVisible = ko.observable(false);
        this.IsHideCardOnZero = false;
        this.PayPalActive = true;
        this.uPayBit_BtnActive = false;
        this.PayMeBitBtnActive = false;
        this.CardcomBitBtnActive = false;
        this.BitButtonText = '';
        this.PayMeIframeSrc = ko.observable('');
        this.PayMePaymentText = ko.observable('');
        this.PayMePaymentError = ko.observable('');
        this.PayMeStatusCheckInterval = {};
        this.ShowPayMeCountdown = ko.observable(false);
        this.generalErrMsg = 'אירעה שגיאה לא צפוייה. אנא סגור את החלון ונסה שנית. במידה והבעיה ממשיכה אנא פנה לתמיכה.';
        this.CardcomBitPaymentText = ko.observable('');
        this.CardcomBitPaymentError = ko.observable('');
        this.ShowCardcomBitCountdown = ko.observable(false);
        this.CardcomBitQrBarcodeUrl = ko.observable('');
        this.CurrentCardcomBitIntervalId = ko.observable(0);
        this.CardcomBitUrl = ko.observable('');
        this.CardcomBitUrlText = ko.observable('');
        this.ShowCardcomBitDiv = ko.observable(false);
        this.IsToSendPreBuyDataToServer = false;
        this.DesignMode = false;
        this.CompanyFootInfoVisible = ko.observable(false);
        this.CompanyFootInfo = ko.observable('');
        this.qeryparams = [];
        this.UniqTempDealID = '';
        this._3DSecureTranId = '';
        this.NotifyURL = '';
        this.IsApplePayActive = false;
        this.IsApplePaySetup = false;
        this.IsApplePayPayment = false;
        this.CompanyName = '';
        this.CardOwnerPhone = '';
        this.CardOwnerEmail = '';
        this.CardOwnerName = '';
        this.language = 'he';
        this.SupportedCardBrands = [];
        this.DirectDebitSplitPayments = false;
        this.SwitchDocumentAndCustomFieldsPositions = false;
        this.AllowBitEmptyCardOwnerName = false;
        this.applePayPaymentTokenHandler = (payment) => {
            this.ApplePayPaymentToken = payment.token;
            this.SubmitApplePayPayment();
        };
        this.Submitting_ApplePay = ko.observable(false);
        this.attemptApplePaySetup = (e) => {
            let btnMarker = this.Submitting_ApplePay;
            let dataToSend = this.LockAndGetData_ifValidExtBtn(btnMarker);
            if (!dataToSend)
                return;
            let applePayCls = this.getApplePayInstance();
            return applePayCls.setupApplePay();
        };
        this.startApplePay = () => {
            if (this.CoinCode == null || this.CoinCode == undefined || this.CoinCode == '') {
                MyAlert.ShowError(this.lang.UnknownCurrency, this.lang.Error);
                return;
            }
            let btnMarker = this.Submitting_ApplePay;
            let dataToSend = this.LockAndGetData_ifValidExtBtn(btnMarker);
            if (!dataToSend)
                return;
            let applePayCls = this.getApplePayInstance();
            let payReq = this.getApplePayPaymentRequest();
            applePayCls.beginPaymentAP(payReq);
        };
        this.notWizardAndPaypal = ko.observable(false);
        this.payBtnSubmitPressCounter = 0;
        this.PayPalBtnVisible = ko.pureComputed(() => {
            if (this.isWizard() && !this.IsOnPaymentScreen())
                return false;
            if (this.creditCardPayment() && this.creditCardPayment().IsHideCardOnZero()) {
                if (this.creditCardPayment().CartTotal() == 0) {
                    return false;
                }
            }
            return true;
        });
        this.PayPalBtn = ko.pureComputed(() => {
            return 'PayPal';
        });
        this.BitBtnVisible = ko.pureComputed(() => {
            if (this.isWizard() && !this.IsOnPaymentScreen())
                return false;
            if (this.creditCardPayment() && this.creditCardPayment().IsHideCardOnZero()) {
                if (this.creditCardPayment().CartTotal() == 0) {
                    return false;
                }
            }
            if (this.dealInfo() && this.dealInfo().sum() > 5000) {
                return false;
            }
            return true;
        });
        this.PayPalBtnSrc = "";
        this.IsIframe = () => {
            try {
                if (parent != window) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return true;
            }
        };
        this.errorsList = new ErrorSummary();
        this.ValidateComponents = () => {
            this.errorsList.messages.removeAll();
            let valid = true;
            if (this.dealInfo() != undefined) {
                if (!this.dealInfo().IsValid()) {
                    this.errorsList.pushError(this.dealInfo().workingDeal().errorsList.messages());
                    valid = false;
                }
            }
            if (!(this.NoCreditcardSection() || this.SubmittingExtPaymentBtn())) {
                if (this.creditCardPayment().IsValid() == false) {
                    this.errorsList.pushError(this.creditCardPayment().errorsList.messages());
                    valid = false;
                }
            }
            const isBit = this.Submitting_uPayBit() || this.Submitting_PayMeBit() || this.Submitting_CardcomBit();
            const isApplePay = this.Submitting_ApplePay();
            if ((isBit && !this.AllowBitEmptyCardOwnerName) || isApplePay) {
                const isValidCardOwnerName = this.creditCardPayment().cardOwnerName.validate();
                if (!isValidCardOwnerName) {
                    const errorMessage = this.Dict[this.creditCardPayment().cardOwnerName.RequiredMessageID];
                    this.errorsList.push(this.creditCardPayment().cardOwnerName.id, errorMessage);
                    valid = false;
                }
            }
            if (this.agreementnew.validate() == false) {
                ko.utils.arrayForEach(this.agreementnew.errorList(), (error) => {
                    this.errorsList.push(this.agreementnew.id, error);
                    valid = false;
                });
            }
            if (this.customFields()) {
                if (this.customFields().IsValid() == false) {
                    this.customFields().errorsList.messages.removeAll();
                    this.customFields().customFields.forEach((cfield) => {
                        cfield.errorList().forEach((error) => {
                            this.customFields().errorsList.push(cfield.id, `${cfield.label.replace('*', '')} ${error}`);
                        });
                    });
                    this.errorsList.pushError(this.customFields().errorsList.messages());
                    valid = false;
                }
            }
            if (this.invoiceToInformation()) {
                if (this.invoiceToInformation().IsValid() == false) {
                    this.errorsList.pushError(this.invoiceToInformation().errorsList.messages());
                    valid = false;
                }
            }
            if (this.allowMerchantMessages.validate() === false) {
                this.allowMerchantMessages.showError(true);
                this.allowMerchantMessages.SetIsValid(false);
                const err = this.allowMerchantMessages.errorList()[0];
                this.errorsList.push(this.allowMerchantMessages.id, err);
                valid = false;
            }
            if (this.ShowApprovecommition == true) {
                if (this.approceCommitionTable.validate() == false) {
                    ko.utils.arrayForEach(this.approceCommitionTable.errorList(), (error) => {
                        this.errorsList.push(this.approceCommitionTable.id, error);
                        valid = false;
                    });
                }
            }
            return valid;
        };
        this.GetDataToSend = () => {
            let deal;
            if (this.dealInfo() != undefined) {
                deal = this.dealInfo().GetAllValues();
            }
            else {
                deal = this.creditCardPayment().GetDealInfo();
            }
            let creditcard = null;
            const isBit = this.Submitting_uPayBit() || this.Submitting_PayMeBit() || this.Submitting_CardcomBit();
            const isApplePay = this.Submitting_ApplePay();
            if ((!this.SubmittingExtPaymentBtn() && !this.NoCreditcardSection()) || isBit || isApplePay) {
                creditcard = this.creditCardPayment().GetAllValues();
            }
            let invoice = null;
            if (this.invoiceToInformation()) {
                invoice = this.invoiceToInformation().GetAllValues();
            }
            let delivery = this.dealInfo() != undefined ? this.dealInfo().Getdelivery() : this.creditCardPayment().GetDelivery();
            let customFields = this.customFields() != undefined ? this.customFields().GetAllValues() : null;
            return {
                NumOfTries: this.payBtnSubmitPressCounter,
                ReturnData: this.ReturnData,
                ReturnToUrl: this.qeryparams[0].ReturnToUrl,
                UID: this.UID,
                ExternalID: this.ExternalID,
                delivery: delivery,
                dealInfo: deal,
                invoiceInfo: invoice,
                creditcardInfo: creditcard,
                customFields: customFields,
                UniqTempDealID: this.UniqTempDealID,
                NotifyURL: this.NotifyURL,
                ListOfNotifyURL: this.ListOfNotifyURL,
                SuccessRedirectUrl: this.SuccessRedirectUrl,
                ErrorRedirectUrl: this.ErrorRedirectUrl,
                GoogleToken: window["googleToken"],
                ReturnValues: this.ReturnValues,
                _3DSecureTranId: this._3DSecureTranId,
                _3DSecureReq: null,
                AllowMerchantMessages: this.allowMerchantMessages.booleanValue(),
                Agreement: this.agreementnew.booleanValue(),
                ApplePayToken: {},
                GooglePayToken: ''
            };
        };
        this.FreezeUiOnExtPaymentBtn = (btnMarker, freezeUi) => {
            this.MarkSubmitBtnDisabled(freezeUi);
            const loaderDisp = freezeUi ? Loaders.Show : Loaders.Hide;
            loaderDisp();
            btnMarker(freezeUi);
        };
        this.LockAndGetData_ifValidExtBtn = (btnMarker, shouldFreezeUI = true) => {
            var _a;
            this.FreezeUiOnExtPaymentBtn(btnMarker, shouldFreezeUI);
            if (parseInt(this.dealInfo().payments.value()) > 1) {
                MyAlert.ShowError(this.lang.OnePaymentOnly, this.lang.Error);
                this.FreezeUiOnExtPaymentBtn(btnMarker, false);
                return;
            }
            if (!this.ValidateComponents()) {
                const errors = this.errorsList.messages();
                if (errors.length == 1 && errors[0].id == 'AgreementNew') {
                    (_a = document.getElementsByClassName('agreementchkbox')[0]) === null || _a === void 0 ? void 0 : _a.scrollIntoView();
                }
                MyAlert.ShowErrorList(this.lang.FixAllErrors, this.lang.Error, this.errorsList, false);
                this.FreezeUiOnExtPaymentBtn(btnMarker, false);
                return;
            }
            this.payBtnSubmitPressCounter++;
            return this.GetDataToSend();
        };
        this.GetExtAjaxOptions = (endpointMethod, dataToSend, verb = 'POST', doAsync = false) => {
            const option = {
                url: `/api/EA4/${endpointMethod}`,
                type: verb,
                async: doAsync,
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
                error: (jqXHR, exception) => { this.ServerRequestError(jqXHR, exception); }
            };
            return option;
        };
        this.SubmittingPaypal = ko.observable(false);
        this.HandlePayPalBtnSubmit = () => {
            let btnMarker = this.SubmittingPaypal;
            let dataToSend = this.LockAndGetData_ifValidExtBtn(btnMarker);
            if (!dataToSend)
                return;
            var option = this.GetExtAjaxOptions('GetPayPalURL', dataToSend);
            $.ajax(option).done((data) => {
                this.SubmittingPaypal(false);
                this.MarkSubmitBtnDisabled(true);
                if (data.RespId == 0) {
                    window.location.href = data.Data;
                }
                else {
                    this.ServerError(data);
                }
            });
        };
        this.Submitting_uPayBit = ko.observable(false);
        this.Handle_uPayBit_BtnSubmit = () => {
            let btnMarker = this.Submitting_uPayBit;
            let dataToSend = this.LockAndGetData_ifValidExtBtn(btnMarker);
            if (!dataToSend)
                return;
            if (!dataToSend.ReturnValues)
                dataToSend.ReturnValues = { UtmParams: {} };
            dataToSend.ReturnValues.UtmParams = this.getUtmData();
            var option = this.GetExtAjaxOptions('GetUpayBitURLs', dataToSend);
            $.ajax(option).done((data) => {
                btnMarker(false);
                this.MarkSubmitBtnDisabled(true);
                if (data.RespId != 0)
                    return this.ServerError(data);
                showBitConfirm(data.Data.RedirectUrl);
                console.log(data, data.Data.uPayBitResponseUrls);
            });
            function showBitConfirm(url) {
                if (confirm('שים לב, תועבר כעת לתשלום בביט')) {
                    window.location.href = url;
                }
            }
        };
        this.GetInvoiceContactDetails = () => {
            const invoice = this.invoiceToInformation();
            if (!invoice) {
                return {};
            }
            return {
                name: invoice.Name.value(),
                phone: invoice.MobilePH.value() || invoice.LinePH.value(),
                email: invoice.InvoiceEmail.value(),
                city: invoice.City.value(),
                street: invoice.AddresLine1.value(),
                zipcode: invoice.AddresLine2.value()
            };
        };
        this.GetCreditCardContactDetails = () => {
            const creditCard = this.creditCardPayment();
            if (!creditCard) {
                return {};
            }
            return {
                name: creditCard.cardOwnerName.value(),
                phone: creditCard.phone.value(),
                email: creditCard.email.value()
            };
        };
        this.Submitting_PayMeBit = ko.observable(false);
        this.Handle_PayMeBitBtnClick = () => {
            let btnMarker = this.Submitting_PayMeBit;
            let dataToSend = this.LockAndGetData_ifValidExtBtn(btnMarker);
            if (!dataToSend)
                return;
            this.startPayMeBitPaymentStage(dataToSend);
        };
        this.startPayMeBitPaymentStage = (details) => {
            var _a, _b, _c, _d, _e, _f;
            Loaders.Hide();
            this.PayMePaymentError('');
            var name = (_b = (_a = details.invoiceInfo) === null || _a === void 0 ? void 0 : _a.Name) !== null && _b !== void 0 ? _b : "";
            var emailAddress = (_d = (_c = details.invoiceInfo) === null || _c === void 0 ? void 0 : _c.InvoiceEmail) !== null && _d !== void 0 ? _d : "";
            var phoneNumber = (_f = (_e = details.invoiceInfo) === null || _e === void 0 ? void 0 : _e.MobilePH) !== null && _f !== void 0 ? _f : "";
            if (!(details === null || details === void 0 ? void 0 : details.ReturnValues))
                details.ReturnValues = { UtmParams: {} };
            details.ReturnValues.UtmParams = this.getUtmData();
            const dataToSend = {
                TerminalNumber: this.terminalNumber.toString(),
                TotalPrice: this.dealInfo().sum().toString(),
                Name: name,
                Email: emailAddress,
                Mobile: phoneNumber,
                SuccessUrl: this.SuccessRedirectUrl,
                ErrorUrl: this.ErrorRedirectUrl,
                DealData: JSON.stringify(details),
                IsEA4: 'true',
                IsLowProfile: 'false',
                IsEA5: 'false'
            };
            const option = {
                method: 'POST',
                url: '/payme/GetNewSaleUrl',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
                error: (jqXHR) => {
                    const errLog = `${jqXHR.responseJSON.Message} ${jqXHR.responseJSON.ExceptionMessage}`;
                    this.showPayMeError(this.generalErrMsg, errLog);
                }
            };
            $.ajax(option).done((response) => {
                if (response.IsError) {
                    if (response.ErrorCode != undefined && response.ErrorCode != null && response.ErrorCode != '')
                        this.showPayMeError(response.Message, null);
                    else {
                        this.showPayMeError(this.generalErrMsg, null);
                    }
                }
                else {
                    let message = 'יש לסרוק את הברקוד עם אפליקציית bit על מנת להמשיך את תהליך התשלום';
                    if (this.language == "en")
                        message = 'Please scan the barcode with Bit application';
                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        message = 'יש ללחוץ על כפתור bit על מנת להמשיך את תהליך התשלום';
                        if (this.language == "en")
                            message = 'Please click on Bit button';
                    }
                    this.PayMePaymentText(message);
                    this.PayMeIframeSrc(response.Url);
                    this.startPayMeCountdown((msg) => this.showPayMeError(msg, null), this.language);
                    this.PayMeStatusCheckInterval = setInterval(this.checkSaleStatus, 2000, response.SaleCode, dataToSend);
                }
            });
        };
        this.Submitting_CardcomBit = ko.observable(false);
        this.Handle_CardcomBitBtnClick = () => {
            var _a, _b, _c;
            let btnMarker = this.Submitting_CardcomBit;
            let dataToSend = this.LockAndGetData_ifValidExtBtn(btnMarker);
            if (!dataToSend)
                return;
            dataToSend.creditcardInfo = this.creditCardPayment().GetAllValues();
            const cardOwnerName = (_b = (_a = dataToSend.creditcardInfo) === null || _a === void 0 ? void 0 : _a.cardOwnerName) !== null && _b !== void 0 ? _b : (_c = dataToSend.invoiceInfo) === null || _c === void 0 ? void 0 : _c.Name;
            if (!cardOwnerName && !this.AllowBitEmptyCardOwnerName) {
                MyAlert.ShowError('שם בעל הכרטיס חובה', 'שגיאה');
                Loaders.Hide();
                return;
            }
            this.startCardcomBitPaymentStage(dataToSend);
        };
        this.startCardcomBitPaymentStage = (details) => {
            Loaders.Show();
            clearInterval(this.CurrentCardcomBitIntervalId());
            this.CurrentCardcomBitIntervalId(0);
            this.CardcomBitPaymentError('');
            this.CardcomBitUrl('');
            if (!(details === null || details === void 0 ? void 0 : details.ReturnValues))
                details.ReturnValues = { UtmParams: {} };
            details.ReturnValues.UtmParams = this.getUtmData();
            var dataToSend = {
                TerminalNumber: this.terminalNumber,
                TotalPrice: this.dealInfo().sum(),
                DealData: JSON.stringify(details),
                DealOrigin: 1
            };
            const option = {
                method: 'POST',
                url: '/api/CardcomBit/CreateNewBitSale',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
                error: (jqXHR) => {
                    let errorMessage = 'Uncaught Error.\n';
                    if (jqXHR.responseJSON)
                        errorMessage += `${jqXHR.responseJSON.Message} ${jqXHR.responseJSON.ExceptionMessage}`;
                    else if (jqXHR.responseText) {
                        const responseJSON = jQuery.parseJSON(jqXHR.responseText);
                        errorMessage += `${responseJSON.Message} ${responseJSON.ExceptionMessage}`;
                    }
                    this.showCardcomBitError(this.generalErrMsg, errorMessage);
                }
            };
            $.ajax(option).done((response) => {
                Loaders.Hide();
                this.ShowCardcomBitDiv(true);
                if (response.HasError) {
                    let errorMessage = response.CustomerErrorMessage;
                    if (!errorMessage)
                        errorMessage = this.generalErrMsg;
                    this.showCardcomBitError(errorMessage, null);
                    return;
                }
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i.test(navigator.userAgent);
                if (isMobile) {
                    const isAndroid = /android/i.test(navigator.userAgent);
                    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent);
                    var bitUrl = `https://static.bankhapoalim.co.il/app/bitcom-info?i=${response.PaymentInitiationId}&j=${response.TransactionSerialId}`;
                    const txtMain = this.Dict['ClickBitButtonToOpenBitApplication'];
                    const txtButton = this.Dict['PayWithBit'];
                    const txtDifferentPaymentMethod = this.Dict['ClickToChooseDifferentPaymentMethod'];
                    if (isAndroid)
                        bitUrl = response.AndroidLink;
                    if (isIos)
                        bitUrl = response.IosLink;
                    const ccBit = new CardcomBitJSFront(bitUrl, txtMain, txtButton, txtDifferentPaymentMethod);
                    ccBit.OnCLoseEvent = () => {
                        clearInterval(this.CurrentCardcomBitIntervalId());
                        this.CurrentCardcomBitIntervalId(0);
                    };
                    ccBit.ShowPopup();
                }
                else {
                    let message = 'יש לסרוק את הברקוד על מנת להמשיך את תהליך התשלום';
                    if (this.language == "en")
                        message = 'Scan the barcode to continue the payment process';
                    this.CardcomBitPaymentText(message);
                    this.CardcomBitQrBarcodeUrl('');
                    if (response.QrBarcodeBytes) {
                        const binaryString = atob(response.QrBarcodeBytes);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        const blob = new Blob([bytes.buffer], { type: "image/jpeg" });
                        const imageUrl = URL.createObjectURL(blob);
                        this.CardcomBitQrBarcodeUrl(imageUrl);
                    }
                }
                let intervalId = 0;
                intervalId = this.startCardcomBitInterval(dataToSend.TerminalNumber, response.PaymentInitiationId);
                this.CurrentCardcomBitIntervalId(intervalId);
            });
        };
        this.getUtmData = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                Source: urlParams.get('utm_source'),
                Medium: urlParams.get('utm_medium'),
                Campaign: urlParams.get('utm_campaign'),
                Content: urlParams.get('utm_content'),
                Term: urlParams.get('utm_term')
            };
        };
        this.checkSaleStatus = (payMeSaleCode, details) => {
            const dataToSend = {
                TerminalNumber: details.TerminalNumber,
                SaleCode: payMeSaleCode,
                SuccessUrl: details.SuccessUrl,
                ErrorUrl: details.ErrorUrl
            };
            const option = {
                method: 'POST',
                url: '/payme/GetSaleStatus',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
                error: (jqXHR) => {
                    const errLog = `${jqXHR.responseJSON.Message} ${jqXHR.responseJSON.ExceptionMessage}`;
                    this.showPayMeError(this.generalErrMsg, errLog);
                }
            };
            $.ajax(option).done((response) => {
                if (response.IsError) {
                    clearInterval(this.PayMeStatusCheckInterval);
                    if (response.ErrorCode != undefined && response.ErrorCode != null && response.ErrorCode != '')
                        this.showPayMeError(response.Message, null);
                    else {
                        this.showPayMeError(this.generalErrMsg, null);
                    }
                }
                else {
                    if (response.Message == 'Completed' || response.Message == 'Failed') {
                        clearInterval(this.PayMeStatusCheckInterval);
                        let isInIframe = false;
                        try {
                            isInIframe = window.self !== window.top;
                        }
                        catch (e) {
                            isInIframe = true;
                        }
                        if (isInIframe) {
                            try {
                                window.top.location.href = response.Url;
                            }
                            catch (e) {
                                window.parent.location.href = response.Url;
                            }
                        }
                        else {
                            window.location.href = response.Url;
                        }
                    }
                }
            });
        };
        this.showPayMeError = (errorMessage, errorToLog) => {
            this.PayMePaymentError(errorMessage);
            this.PayMePaymentText('');
            this.ShowPayMeCountdown(false);
            this.PayMeIframeSrc('');
            if (errorToLog != undefined && errorToLog != null && errorToLog.trim() != '')
                console.error(errorToLog);
        };
        this.startPayMeCountdown = (errorFunc, lang) => {
            this.ShowPayMeCountdown(true);
            var element, endTime, hours, mins, msLeft, time;
            function twoDigits(n) {
                return (n <= 9 ? "0" + n : n);
            }
            function updateTimer() {
                msLeft = endTime - (+new Date);
                if (msLeft < 1000) {
                    clearInterval(this.PayMeStatusCheckInterval);
                    let error = 'פג תוקף הבקשה. יש ללחוץ על כפתור bit כדי לנסות שוב';
                    if (lang == "en")
                        error = 'Request timeout. Please click on Bit button to try again.';
                    errorFunc(error);
                }
                else {
                    time = new Date(msLeft);
                    hours = time.getUTCHours();
                    mins = time.getUTCMinutes();
                    let message = `יש להשלים את התהליך תוך ${(hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds())} דקות`;
                    if (lang == "en")
                        message = `Please complete the payment in the next ${(hours ? hours + ':' + twoDigits(mins) : mins) + ':' + twoDigits(time.getUTCSeconds())} minutes.`;
                    element.innerHTML = message;
                    setTimeout(updateTimer, time.getUTCMilliseconds() + 500);
                }
            }
            const minutesToCout = 9;
            element = document.getElementById('payme-countdown');
            endTime = (+new Date) + 1000 * (60 * minutesToCout) + 500;
            updateTimer();
        };
        this.closeCardcomBitPopup = () => {
            console.log('closeCardcomBitPopup');
        };
        this.showCardcomBitError = (errorMessage, errorToLog) => {
            clearInterval(this.CurrentCardcomBitIntervalId());
            this.CurrentCardcomBitIntervalId(0);
            this.CardcomBitPaymentError(errorMessage);
            this.CardcomBitPaymentText('');
            this.ShowCardcomBitCountdown(false);
            this.CardcomBitQrBarcodeUrl('');
            this.CardcomBitUrl('');
            if (errorToLog != undefined && errorToLog != null && errorToLog.trim() != '')
                console.error(errorToLog);
        };
        this.startCardcomBitInterval = (terminalNumber, paymentInitiationId) => {
            const interval = setInterval(() => {
                this.getCardcomBitSaleDetails(terminalNumber, paymentInitiationId).then((response) => {
                    if (response.HasError) {
                        let errorMessage = this.Dict['PaymentFailedRetryOrOtherMethod'];
                        if (response.CustomerErrorMessage)
                            errorMessage = response.CustomerErrorMessage;
                        this.showCardcomBitError(errorMessage, null);
                        return;
                    }
                    const isWaiting = response.RequestStatusCode == 4
                        || response.RequestStatusCode == 9
                        || response.RequestStatusCode == 12
                        || response.RequestStatusCode == 17;
                    const isCharged = response.RequestStatusCode == 11;
                    const isCanceled = response.RequestStatusCode == 3;
                    const isExpired = response.RequestStatusCode == 7;
                    if (isWaiting) {
                        return;
                    }
                    else if (isCharged) {
                        clearInterval(this.CurrentCardcomBitIntervalId());
                        this.CurrentCardcomBitIntervalId(0);
                        window.location.href = this.SuccessRedirectUrl;
                        return;
                    }
                    else if (isCanceled) {
                        const errorMessage = this.Dict['PaymentCanceledByCustomer'];
                        this.showCardcomBitError(errorMessage, null);
                        return;
                    }
                    else if (isExpired) {
                        const errorMessage = this.Dict['PaymentRequestExpired'];
                        this.showCardcomBitError(errorMessage, null);
                        return;
                    }
                    else {
                        let errorMessage = this.Dict['PaymentFailedRetryOrOtherMethod'];
                        if (response.RequestStatusCode)
                            errorMessage += ` (${response.RequestStatusCode})`;
                        this.showCardcomBitError(errorMessage, null);
                        return;
                    }
                }).fail((error) => {
                    console.error(error);
                    return;
                });
            }, 5000);
            return interval;
        };
        this.SubmittingExtPaymentBtn = ko.computed(() => {
            return this.SubmittingPaypal() || this.Submitting_ApplePay() || this.Submitting_uPayBit() || this.Submitting_PayMeBit() || this.Submitting_CardcomBit();
        }, this);
        this.getQueryParams = (qs) => {
            qs = qs.split("+").join(" ");
            var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;
            while (tokens = re.exec(qs)) {
                params[decodeURIComponent(tokens[1])]
                    = decodeURIComponent(tokens[2]);
            }
            return params;
        };
        this.NoCreditcardSection = ko.observable(false);
        this.MarkSubmitBtnDisabled = ko.observable(false);
        this.ShouldDisableSubmitBtn = ko.computed(() => {
            return this.DesignMode || this.MarkSubmitBtnDisabled();
        }, this);
        this.SubmitBtn = ko.pureComputed(() => {
            if (this.creditCardPayment()) {
                if (this.creditCardPayment().IsHideCardOnZero() == true) {
                    this.NoCreditcardSection(true);
                    return this.lang.SubmitBtn;
                }
            }
            this.NoCreditcardSection(false);
            return this.lang.icmdCommit;
        });
        this.PaymentHeaderVisibe = ko.pureComputed(() => {
            if (this.isWizard() && !this.IsOnPaymentScreen())
                return false;
            if (this.creditCardPayment()) {
                if (this.creditCardPayment().IsHideCardOnZero() == true) {
                    return false;
                }
            }
            return this.PayPalActive || this.uPayBit_BtnActive || this.PayMeBitBtnActive || this.CardcomBitBtnActive;
        });
        this.CreditCardModalSectionVisible = ko.pureComputed(() => {
            if (this.isWizard() && !this.IsOnPaymentScreen())
                return false;
            if (this.creditCardPayment()) {
                if (this.creditCardPayment().IsHideCardOnZero() == true) {
                    return false;
                }
            }
            return true;
        });
        this.updateGoogleTokenV3 = () => __awaiter(this, void 0, void 0, function* () {
            var result = yield (grecaptcha === null || grecaptcha === void 0 ? void 0 : grecaptcha.execute('6Ld7ShcoAAAAAJT8z3Y18pqMAqx1x2KLrKo9iutE', { action: 'EA4' }));
            window["googleToken"] = result;
            return;
        });
        this.PayBtnSubmit = () => __awaiter(this, void 0, void 0, function* () {
            this.MarkSubmitBtnDisabled(true);
            if (this.ValidateComponents() == false) {
                MyAlert.ShowErrorList(this.lang.FixAllErrors, this.lang.Error, this.errorsList, false);
                this.MarkSubmitBtnDisabled(false);
                return;
            }
            if (this.IsRecaptchaActive && this.RecaptchaVersion === 'v3') {
                yield this.updateGoogleTokenV3();
            }
            Loaders.Show();
            this.payBtnSubmitPressCounter++;
            this.ProcessPaymetToBackend();
        });
        this.afterPaymentSubmit = () => {
            this.onloadCallbackgoogle();
            this.MarkSubmitBtnDisabled(false);
        };
        this.DeviceFingerPrint3DSecureFunc = (fingerPrintResp) => {
            switch (fingerPrintResp.ResponseCode) {
                case Cardcom3DSecureResponseCode.PassOver3DSecureAuth:
                case Cardcom3DSecureResponseCode.Auth: {
                    this.PostSubmitPayment();
                    break;
                }
                case Cardcom3DSecureResponseCode.CardHolderChellenge: {
                    Loaders.Hide();
                    this._3DSecureService.StartCardholderChallenge(fingerPrintResp).done(this.CardholderChallenge3DSecureFunc);
                    break;
                }
                case Cardcom3DSecureResponseCode.RejectAuth:
                case Cardcom3DSecureResponseCode.FailAuth: {
                    Loaders.Hide();
                    let msg = fingerPrintResp.ResponseCode === Cardcom3DSecureResponseCode.RejectAuth ? "אימות סורב" : "אימות נכשל";
                    MyAlert.ShowError(msg, "הודעה");
                    window.location.href = this.ErrorRedirectUrl;
                    break;
                }
                case Cardcom3DSecureResponseCode.FailError: {
                    Loaders.Hide();
                    MyAlert.ShowError(fingerPrintResp.ErrorDescToUser, "הודעת שגיאה");
                    break;
                }
                default: {
                    Loaders.Hide();
                    MyAlert.ShowError("אירעה שגיאה לא צפויה, נא לפנות לבית העסק", "הודעת שגיאה");
                    console.log("The unknown response ::: ", JSON.stringify(fingerPrintResp));
                    break;
                }
            }
        };
        this.CardholderChallenge3DSecureFunc = (challengeResp) => {
            Loaders.Show();
            switch (challengeResp.ResponseCode) {
                case Cardcom3DSecureResponseCode.PassOver3DSecureAuth:
                case Cardcom3DSecureResponseCode.Auth: {
                    this.PostSubmitPayment();
                    break;
                }
                case Cardcom3DSecureResponseCode.RejectAuth:
                case Cardcom3DSecureResponseCode.FailAuth: {
                    Loaders.Hide();
                    let msg = challengeResp.ResponseCode === Cardcom3DSecureResponseCode.RejectAuth ? "אימות סורב" : "אימות נכשל";
                    MyAlert.ShowError(msg, "הודעה");
                    window.location.href = this.ErrorRedirectUrl;
                    break;
                }
                case Cardcom3DSecureResponseCode.FailError: {
                    Loaders.Hide();
                    MyAlert.ShowError(challengeResp.ErrorDescToUser, "הודעת שגיאה");
                    break;
                }
                default: {
                    Loaders.Hide();
                    MyAlert.ShowError("אירעה שגיאה לא צפויה, נא לפנות לבית העסק", "הודעת שגיאה");
                    console.log("The unknown response ::: ", JSON.stringify(challengeResp));
                    break;
                }
            }
        };
        this.isToShowSuccessPopup = ko.observable(false);
        this.SuccessMessage = ko.observable('');
        this.SuccessHeader = ko.observable('');
        this.ProccessSuccess = (data) => {
            var d = data.Data;
            if (d.ShowCardOunwerID) {
                Loaders.Hide();
                this.creditCardPayment().cardUserId.hide(false);
                this.creditCardPayment().cardUserId.SetIsValid(false);
                this.creditCardPayment().cardUserId.Required = true;
                MyAlert.ShowError(d.Message, this.lang.Error);
                return;
            }
            if (d.Redirect) {
                if (data.Data.ShowSuccessPopUp) {
                    Loaders.Hide();
                    this.SuccessMessage(d.Message);
                    this.isToShowSuccessPopup(true);
                    setTimeout(() => {
                        window.location.href = d.RedirectAddress;
                    }, 3 * 1000);
                }
                else {
                    window.location.href = d.RedirectAddress;
                }
                return;
            }
            if (d.Retray) {
                Loaders.Hide();
                MyAlert.ShowError(d.Message, this.lang.Error);
                return;
            }
        };
        this.ServerError = (data) => {
            Loaders.Hide();
            if (data.RespId == 9992) {
                MyAlert.ShowError(this.lang.ilblKuponOutOfStock, this.lang.Error);
            }
            else if (data.RespId == 99991) {
                MyAlert.ShowError(this.lang.RecaptchaError, this.lang.Error);
            }
            else if (data.RespId == 9993) {
                MyAlert.ShowError(this.lang.ilbItemOutOfStock, this.lang.Error);
            }
            else if (data.RespId == 9994) {
                MyAlert.ShowError(this.lang.CardNotSupported, "הערה");
            }
            else if (data.RespId == 9995) {
                MyAlert.ShowError(this.lang.ilblKuponExpired, this.lang.Error);
            }
            else if (data.RespId == 5146) {
                MyAlert.ShowError(this.lang.BitTransactionLimit, this.lang.Error);
            }
            else if (data.RespId == 5147) {
                MyAlert.ShowError(this.lang.BitNotSupported, this.lang.Error);
            }
            else {
                MyAlert.ShowError(this.lang.iError, this.lang.Error);
            }
            return;
        };
        this.isToShowUseTerm = ko.observable(false);
        this.ShowUseTerm = () => {
            this.isToShowUseTerm(true);
        };
        this.CloseUseTerm = () => {
            this.isToShowUseTerm(false);
        };
        this.IsToShowUseTermCb = ko.observable(true);
        this.IsToShowCommitionTable = ko.observable(true);
        this.ExternalID = '';
        this.SendPreBuyDataToServer = () => {
            if (this.IsToSendPreBuyDataToServer == false) {
                return;
            }
            let dataToSend = this.GetDataToSend();
            let ajaxOption = {
                type: 'POST',
                url: '/api/EA4/WritePreBuyDataToServer',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
            };
            $.ajax(ajaxOption);
        };
        this.IsOnPaymentScreen = ko.observable(false);
        this.showCreditCardHeaderifPayPalActive = ko.observable(false);
        this.pageIndex = 0;
        this.NextBtn = () => {
            if (this.controllerArray[this.pageIndex]().IsValid() == false) {
                return;
            }
            this.pageIndex++;
            this.ShowController();
            this.SendPreBuyDataToServer();
        };
        this.PreviousBtn = () => {
            this.pageIndex--;
            this.ShowController();
        };
        this.ShowDealInfo = () => {
            this.ModalHeader(this.lang.ilblPurchaseHead);
            this.CreditCardModalVisible(false);
            this.InvoiceModalVisible(false);
            this.DealInfoModalVisible(true);
            this.CustomFieldsModalVisible(false);
            this.showCreditCardHeaderifPayPalActive(false);
            this.IsToShowUseTermCb(false);
            this.IsToShowCommitionTable(false);
        };
        this.ShowInvoiceInfo = () => {
            this.ModalHeader(this.lblInvoiceHead);
            this.CreditCardModalVisible(false);
            this.InvoiceModalVisible(true);
            this.DealInfoModalVisible(false);
            this.CustomFieldsModalVisible(false);
            this.showCreditCardHeaderifPayPalActive(false);
            this.IsToShowUseTermCb(false);
            this.IsToShowCommitionTable(false);
        };
        this.ShowCreditCardInfo = () => {
            this.ModalHeader(this.lang.ilblCreditCardHead);
            if (this.creditCardPayment()) {
                if (this.dealInfo()) {
                    this.creditCardPayment().CartTotal(this.dealInfo().sum());
                }
                else {
                    if (this.creditCardPayment().dealInfoRef()) {
                        this.creditCardPayment().CartTotal(this.creditCardPayment().dealInfoRef().sum());
                    }
                }
            }
            this.CreditCardModalVisible(true);
            this.DealInfoModalVisible(false);
            this.InvoiceModalVisible(false);
            this.CustomFieldsModalVisible(false);
            this.showCreditCardHeaderifPayPalActive(!this.creditCardPayment().IsHideCardOnZero() && (this.PayPalActive || this.uPayBit_BtnActive || this.PayMeBitBtnActive || this.CardcomBitBtnActive));
            this.IsToShowUseTermCb(true);
            this.IsToShowCommitionTable(true);
        };
        this.ShowCustomFields = () => {
            this.ModalHeader(this.lang.ilblAdditionalDetaild);
            this.CreditCardModalVisible(false);
            this.InvoiceModalVisible(false);
            this.DealInfoModalVisible(false);
            this.CustomFieldsModalVisible(true);
            this.IsToShowUseTermCb(false);
            this.IsToShowCommitionTable(false);
        };
        this.updateCreditCard = ko.computed(() => {
            if (this.creditCardPayment()) {
                if (this.dealInfo()) {
                    this.creditCardPayment().CartTotal(this.dealInfo().sum());
                }
                else {
                    if (this.creditCardPayment().dealInfoRef()) {
                        this.creditCardPayment().CartTotal(this.creditCardPayment().dealInfoRef().sum());
                    }
                }
            }
        });
        this.showCreditCardHeader = ko.pureComputed(() => {
            if (this.isWizard() && !this.IsOnPaymentScreen())
                return false;
            if (this.creditCardPayment()) {
                if (this.creditCardPayment().IsHideCardOnZero()) {
                    if (this.creditCardPayment().CartTotal() == 0) {
                        return false;
                    }
                }
            }
            return true;
        });
        this.isHideOnZeroAndZeroSum = ko.pureComputed(() => {
            return this.creditCardPayment().IsHideCardOnZero() && this.creditCardPayment().CartTotal() == 0;
        });
        this.SetCreditCardPaymentRef = (ModuelReg) => {
            this.creditCardPayment(ModuelReg);
            this.creditCardPayment().SetParent(this);
            this.ComponetLoaded();
        };
        this.SetInvoiceToInformationRef = (ModuelReg) => {
            this.invoiceToInformation(ModuelReg);
            this.ComponetLoaded();
        };
        this.SetDealInfoToInformationRef = (ModuelReg) => {
            this.dealInfo(ModuelReg);
            this.dealInfo().payments.value.subscribe(() => {
                this.ToggleDisplayCommissionPolicyTable();
                this.approceCommitionTable.value('false');
            });
            this.ComponetLoaded();
        };
        this.SetCustomFieldsToInformationRef = (ModuelReg) => {
            this.customFields(ModuelReg);
            this.ComponetLoaded();
        };
        this.SetErrorRef = (ModuelReg) => {
            this.error(ModuelReg);
            this.ComponetLoaded();
        };
        this.totalLoaded = 0;
        this.ComponetLoaded = () => {
            this.totalLoaded++;
            if (this.totalLoaded == this.controllerArray.length) {
                if (this.isWizard()) {
                    this.ShowController();
                }
            }
        };
        this.useTermLink = ko.observable();
        this.useTernHeader = ko.observable();
        this.ShowUseTermPopup = () => {
            this.ShowPopup(this.agreementnew.link, this.lang.IHaveReadTheAgreementLit);
        };
        this.ToggleDisplayCommissionPolicyTable = () => {
            let CommissionRow = this.dealInfo().GetCommtionRowForCommitionTable();
            let shouldHideCommission = CommissionRow !== undefined ? false : true;
            if (this.ShowApprovecommition == false) {
                shouldHideCommission = true;
            }
            this.approceCommitionTable.hide(shouldHideCommission);
            if (shouldHideCommission)
                this.approceCommitionTable.validate();
            this.ClearCommissionTable();
        };
        this.ShowComittionInfo = () => {
            let CommissionTableTag = $("#CommissionTable");
            if (CommissionTableTag.children().length > 0) {
                CommissionTableTag.slideToggle();
            }
            else {
                Loaders.Show();
                this.GetCommissionTableData().done((res) => {
                    Loaders.Hide();
                    let body = res.Data;
                    if (!body.IsOk) {
                        let topText = $("<p></p>").text(body.firstText);
                        $("#CommissionTable").append(topText);
                    }
                    else {
                        this.RenderCommissionTable(body);
                        CommissionTableTag.slideToggle();
                    }
                });
            }
        };
        this.GetCommissionTableData = () => {
            let uid = '';
            if (this.dealInfo().DealInfoType == DealInfoTypeEnum.ShopingCart) {
                uid = this.dealInfo().GroupUID;
            }
            else {
                uid = this.dealInfo().itmRef().UID;
            }
            let dataToSend = {
                UID: uid,
                TotalAMT: this.dealInfo().sum(),
                NumberOfPayments: this.dealInfo().payments.value(),
                Coin: 1,
                terminalNumber: this.terminalNumber,
            };
            let ajaxOption = {
                type: 'POST',
                url: '/api/EA4/GetCommitionTableInfo',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
            };
            return $.ajax(ajaxOption);
        };
        this.RenderCommissionTable = (body) => {
            let br = $("<br>");
            let topText = $("<p></p>").text(body.firstText);
            $("#CommissionTable").append(topText);
            $("#CommissionTable").append(br);
            let tempDiv = $("<div></div>");
            let table = tempDiv.clone().addClass("commissionTableFlex");
            let row = tempDiv.clone().addClass("commissionTableFlexRow");
            let col = tempDiv.clone().addClass("commissionTableFlexRowCol");
            let headerRow = row.clone();
            {
                let boldAndUnderscore = $("<u></u>").css("font-weight", "bold");
                headerRow.append(col.clone().append(boldAndUnderscore.clone().text("תשלום")));
                headerRow.append(col.clone().append(boldAndUnderscore.clone().text("החזר קרן")));
                headerRow.append(col.clone().append(boldAndUnderscore.clone().text("החזר ריבית")));
                headerRow.append(col.clone().append(boldAndUnderscore.clone().text("יתרת קרן")));
            }
            table.append(headerRow);
            for (let i = 0; i < body.clearingtable.length; i++) {
                let rowData = body.clearingtable[i];
                let bodyRow = row.clone();
                bodyRow.append(col.clone().text(i + 1));
                bodyRow.append(col.clone().text(rowData.partloan));
                bodyRow.append(col.clone().text(rowData.commission));
                bodyRow.append(col.clone().text(rowData.balanceafterpayment));
                table.append(bodyRow);
            }
            $("#CommissionTable").append(table);
            $("#CommissionTable").append(br);
            let bottomText = $("<p></p>").text(body.endText);
            $("#CommissionTable").append(bottomText);
        };
        this.ClearCommissionTable = () => {
            let CommissionTableTag = $("#CommissionTable");
            CommissionTableTag.empty();
            CommissionTableTag.slideUp();
        };
        this.ShowPopup = (link, header) => {
            this.useTernHeader(header);
            if (link && link.indexOf("https") == 0 && link.indexOf("drive.google.com") == 0) {
                this.useTermLink(link);
                this.isToShowUseTerm(true);
            }
            else {
                window.open(link);
            }
        };
        this.DoneBinding = () => {
            return false;
        };
        this.ServerRequestError = (jqXHR, exception) => {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            }
            else if (jqXHR.status == 404) {
                msg = 'Requested page not found. [404]';
            }
            else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            }
            else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            }
            else if (exception === 'timeout') {
                msg = 'Time out error.';
            }
            else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            }
            else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            MyAlert.ShowError(msg, this.lang.Error);
        };
        this.ShowCaptchaInWizard = ko.pureComputed(() => {
            return this.IsRecaptchaActive && this.isWizard;
        });
        this.ProcessKupon = () => {
            if (this.UID != "ix2") {
                return;
            }
            var dc = new DiscountByCardNumber();
            var kupor = dc.GetKuponDiscount(this.creditCardPayment().cardNumber.value());
            if (kupor == null)
                return;
            this.dealInfo().DoNotDisplayKupon(true);
            this.dealInfo().Kupon.value(kupor);
            this.dealInfo().CheckKupon();
        };
        this.onloadCallbackgoogle = () => {
            if (window['grecaptcha'] != undefined && this.RecaptchaVersion !== 'v3') {
                window['grecaptcha'].reset();
            }
        };
        this.qeryparams.push(this.getQueryParams(window.location.search));
        let ea4Int = params.EA4Init;
        if (ea4Int.IsError) {
            MyAlert.ShowError(this.lang.FixAllErrors, this.lang.Error, false);
            return;
        }
        this.controlInitError = ea4Int.controlInitError;
        this.IsToSendPreBuyDataToServer = ea4Int.IsToSendPreBuyDataToServer == true ? true : false;
        this.CompanyFootInfo(ea4Int.CompanyFootInfo ? ea4Int.CompanyFootInfo : '');
        this.CompanyFootInfoVisible(this.CompanyFootInfo() != '' ? true : false);
        this.Is3DSecureEnabled = ea4Int.Is3DSecureEnabled;
        this.CheckboxForAllowForMerchantMessages = ea4Int.CheckboxForAllowForMerchantMessages;
        this.MustAllowMerchantMessages = ea4Int.MustAllowMerchantMessages;
        this.lblInvoiceHead = ea4Int.lblInvoiceHead;
        this.whatsAppVisible = ea4Int.whatsAppVisible;
        this.whatsappLink = ea4Int.whatsAppLink;
        this.UID = ea4Int.UID;
        this.terminalNumber = ea4Int.terminalNumber;
        this.CoinID = ea4Int.CoinID;
        this.CoinCode = ea4Int.CoinCode;
        this.ExternalID = ea4Int.ExternalID;
        this.Dict = ea4Int.langDic;
        this.UniqTempDealID = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
        this.ListOfNotifyURL = ea4Int.ListOfNotifyURLs;
        this.NotifyURL = ea4Int.NotifyURL;
        this.ReturnData = ea4Int.ReturnData;
        this.DesignMode = ea4Int.DesignMode;
        this.NumOfRetriesAllowed = ea4Int.NumOfRetriesAllowed;
        this.SuccessRedirectUrl = ea4Int.SuccessRedirectUrl;
        this.ErrorRedirectUrl = ea4Int.ErrorRedirectUrl;
        this.IsRecaptchaActive = ea4Int.IsRecaptchaActive;
        this.RecaptchaVersion = ea4Int.RecaptchaVersion;
        this.ShowApprovecommition = ea4Int.ShowApprovecommition;
        this.uPayBit_BtnActive = (_a = ea4Int.uPayBit_BtnActive) !== null && _a !== void 0 ? _a : false;
        this.PayMeBitBtnActive = (_b = ea4Int.PayMeBitBtnActive) !== null && _b !== void 0 ? _b : false;
        this.CardcomBitBtnActive = ea4Int.CardcomBitBtnActive;
        this.BitButtonText = ea4Int.BitButtonText;
        this.PayPalActive = ea4Int.PayPalActive == true ? ea4Int.PayPalActive : false;
        this.PayPalBtnSrc = ea4Int.PayPalBtnSrc;
        this.ReturnValues = ea4Int.ReturnValues;
        this.IsHideCardOnZero = ea4Int.IsHideCardOnZero == true ? ea4Int.IsHideCardOnZero : false;
        this.controlInitCreditCardPaymentForPopup = ea4Int.controlInitCreditCardPaymentForPopup;
        this.allowMerchantMessages = new MyInput("AllowMerchantMessages");
        this.allowMerchantMessages.booleanValue(true);
        this.allowMerchantMessages.CheckboxValidator = () => {
            if (this.CheckboxForAllowForMerchantMessages && this.MustAllowMerchantMessages) {
                if (this.allowMerchantMessages.booleanValue() === false) {
                    let errorLabel = this.lang["MustAllowMerchantMessages"];
                    this.allowMerchantMessages.errorList.push(errorLabel);
                    this.allowMerchantMessages.SetIsValid(false);
                    this.allowMerchantMessages.showError(true);
                    return false;
                }
                else {
                    this.allowMerchantMessages.showError(false);
                    this.allowMerchantMessages.SetIsValid(true);
                    if (this.allowMerchantMessages.errorList[0])
                        this.allowMerchantMessages.errorList.pop();
                    return true;
                }
            }
        };
        this.allowMerchantMessages.value.subscribe((newVal) => {
            this.allowMerchantMessages.validate();
        });
        this.allowMerchantMessages.inputType = 3;
        this.agreementnew = new MyInput("AgreementNew", ea4Int.controlInitCreditCardPaymentForPopup.agreement);
        this.agreementnew.inputType = 3;
        this.approceCommitionTable = new MyInput("approvecommition", ea4Int.controlInitCreditCardPaymentForPopup.approvecommition);
        this.approceCommitionTable.value.subscribe((newVal) => {
            this.approceCommitionTable.validate();
        });
        this.approceCommitionTable.inputType = 3;
        this.controlInitInvoiceToInformation = ea4Int.controlInitInvoiceToInformation;
        this.controlInitCustomFields = ea4Int.controlInitCustomFields;
        if (ea4Int.controlInitCustomFields.customFields.length == 0) {
            this.CustomFieldsModalVisible(false);
        }
        this.controlInitDealInfo = ea4Int.controlInitDealInfo;
        if (ea4Int.ShowDealInfo == true) {
            this.isToSowDealInfo(true);
            this.controllerArray.push(this.dealInfo);
        }
        this.IsToShowInvoice(ea4Int.IsToShowInvoice);
        if (ea4Int.IsToShowInvoice) {
            this.InvoiceModalVisible(true);
            this.controllerArray.push(this.invoiceToInformation);
        }
        if (this.CustomFieldsModalVisible())
            this.controllerArray.push(this.customFields);
        this.controllerArray.push(this.creditCardPayment);
        window['controller'] = this;
        if (ea4Int.isWizard == true) {
            this.isWizard(true);
            this.CompanyFootInfoVisible(false);
            this.pageIndex = 0;
            this.IsToShowUseTermCb(false);
        }
        else {
            this.notWizardAndPaypal(!(this.isWizard() || this.PayPalActive || this.uPayBit_BtnActive || this.PayMeBitBtnActive || this.CardcomBitBtnActive));
            this.showCreditCardHeaderifPayPalActive(this.PayPalActive || this.uPayBit_BtnActive || this.PayMeBitBtnActive || this.CardcomBitBtnActive);
        }
        this.CompanyName = ea4Int.CompanyName;
        this.IsApplePayActive = ApplePayJSFront.SupportedByDevice() && ea4Int.ApplePayActive;
        this.ApplePayInstance = this.getApplePayInstance();
        this.IsApplePaySetup = this.ApplePayInstance.flagsComputed._SetupBtn();
        this.IsApplePayPayment = this.ApplePayInstance.flagsComputed._PaymentBtn();
        this.language = ea4Int.lang;
        this.SupportedCardBrands = ea4Int.SupportedCardBrands;
        this.DirectDebitSplitPayments = ea4Int.DirectDebitSplitPayments;
        this.SwitchDocumentAndCustomFieldsPositions = ea4Int.SwitchDocumentAndCustomFieldsPositions;
        this.AllowBitEmptyCardOwnerName = ea4Int.AllowBitEmptyCardOwnerName;
        this.fixExternalPaymentsButtonsStyle();
        this.CardcomBitUrlText(this.Dict['ClickToOpenBitApplication']);
    }
    fixExternalPaymentsButtonsStyle() {
        const paypalBtn = $('img#PayUsingPayPal');
        if (paypalBtn) {
            paypalBtn.css('width', '240px');
            paypalBtn.css('height', '38.7px');
        }
    }
    getApplePayInstance() {
        if (!this.ApplePayInstance) {
            this.ApplePayInstance = new ApplePayJSFront(this.CompanyName, this.applePayPaymentTokenHandler, Loaders);
        }
        return this.ApplePayInstance;
    }
    ;
    googlePayPaymentTokenHandler(googlePayToken) {
        this.GooglePayPaymentToken = googlePayToken;
        this.SubmitGooglePayPayment();
    }
    getApplePayPaymentRequest() {
        var _a;
        const dataToSend = this.GetDataToSend();
        let totalSum = 0.0;
        const invLineItems = [];
        dataToSend.dealInfo.items.forEach((item) => {
            const productTotalPrice = (Math.round(item.total * item.quantity * 100) / 100);
            totalSum += productTotalPrice;
            invLineItems.push({ label: item.desk, amount: productTotalPrice.toString(), type: 'final' });
        });
        const deliveryMethods = (_a = this.controlInitDealInfo.Delivery) === null || _a === void 0 ? void 0 : _a.slcObjWithCost;
        if (deliveryMethods != undefined) {
            const selectedDelivery = deliveryMethods.find(d => d.key == dataToSend.delivery);
            if (selectedDelivery != undefined && selectedDelivery.Cost > 0) {
                const deliveryPrice = (Math.round(selectedDelivery.Cost * 1 * 100) / 100);
                totalSum += deliveryPrice;
                invLineItems.push({ label: selectedDelivery.text, amount: deliveryPrice.toString(), type: 'final' });
            }
        }
        const total = this.dealInfo().sum();
        if (dataToSend.dealInfo.kupon != null && dataToSend.dealInfo.kupon != undefined && dataToSend.dealInfo.kupon.trim() != '') {
            const discount = totalSum - total;
            if (discount > 0) {
                invLineItems.push({ label: 'הנחת קופון', amount: (discount * -1).toString(), type: 'final' });
            }
        }
        const p = Math.pow(10, 2);
        const totalOrderSum = Math.round(total * p) / p;
        const totalItem = {
            amount: totalOrderSum.toString(),
            label: this.CompanyName,
            type: "final"
        };
        const invoice = this.GetInvoiceContactDetails();
        const creditCard = this.GetCreditCardContactDetails();
        const knownContactDetails = {
            givenName: creditCard.name || invoice.name,
            phoneNumber: creditCard.phone || invoice.phone,
            emailAddress: creditCard.email || invoice.email,
            addressLines: [invoice.street || '-'],
            postalCode: invoice.zipcode || '-',
            locality: invoice.city || '-',
            countryCode: 'IL',
        };
        const requiredContactFields = [];
        if (this.controlInitCreditCardPaymentForPopup.email.Required)
            requiredContactFields.push("email");
        if (this.controlInitCreditCardPaymentForPopup.phone.Required)
            requiredContactFields.push("phone");
        if (this.controlInitCreditCardPaymentForPopup.cardOwnerName.Required || requiredContactFields.length > 0)
            requiredContactFields.push("name");
        const paymentRequest = {
            countryCode: 'IL',
            currencyCode: this.CoinCode,
            total: totalItem,
            merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
            supportedNetworks: this.SupportedCardBrands,
            requiredBillingContactFields: [...requiredContactFields],
            requiredShippingContactFields: [],
            billingContact: knownContactDetails,
            shippingContact: knownContactDetails,
            lineItems: invLineItems
        };
        return paymentRequest;
    }
    ;
    Getrequest3DSecure() {
        const creditCardPayment = this.creditCardPayment();
        this._3DSecureReq = {
            TerminalNum: this.terminalNumber,
            CoinId: this.CoinID,
            CardNumber: creditCardPayment.cardNumber.value(),
            CardholderFullName: creditCardPayment.cardOwnerName.value(),
            CardholderPhone: creditCardPayment.phone.value(),
            CardHolderEmail: creditCardPayment.email.value(),
            CVV: creditCardPayment.cvv.value(),
            CardExpireMonth: creditCardPayment.month.value(),
            CardExpireYear: creditCardPayment.year.value().substr(2, 2),
            RequestedBillingAmount: this.dealInfo().sum(),
            UserAgentHeader: navigator.userAgent,
            browserLanguage: navigator.language,
            _3ds_browserjavaenabled: "true",
            _3ds_browserscreenheight: window.screen.height.toString(),
            _3ds_browserscreenwidth: window.screen.width.toString(),
            _3ds_browsercolordepth: window.screen.colorDepth.toString(),
            _3ds_challengewindowsize: "05",
            _3ds_channel: "02",
            _3ds_category: "01",
            _3ds_transtype: "01",
            ExternalAisurit4DealPageUID: this.UID,
            DealToSaveJSON: "",
            _d6: window.navigator.language,
            DirectDebitSplitPaymentsSum: this.dealInfo().sum()
        };
        if (this.DirectDebitSplitPayments) {
            const price = this.dealInfo().sum();
            const numOfPayments = parseInt(this.dealInfo().payments.value());
            if (numOfPayments > 0) {
                const constPayment = price / numOfPayments;
                const firstPayment = price - (constPayment * (numOfPayments - 1));
                const requestedBillingAmount = Math.round(firstPayment * 100) / 100;
                this._3DSecureReq.DirectDebitSplitPaymentsSum = requestedBillingAmount;
            }
        }
        return this._3DSecureReq;
    }
    getCardcomBitSaleDetails(terminalNumber, paymentInitiationId) {
        const dataToSend = {
            TerminalNumber: terminalNumber,
            PaymentInitiationId: paymentInitiationId
        };
        const option = {
            method: 'POST',
            url: '/api/CardcomBit/GetBitSaleDetails',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            error: (jqXHR) => {
                let errorMessage = 'Uncaught Error.\n';
                if (jqXHR.responseJSON)
                    errorMessage += `${jqXHR.responseJSON.Message} ${jqXHR.responseJSON.ExceptionMessage}`;
                else if (jqXHR.responseText) {
                    const responseJSON = jQuery.parseJSON(jqXHR.responseText);
                    errorMessage += `${responseJSON.Message} ${responseJSON.ExceptionMessage}`;
                }
                this.showCardcomBitError(this.generalErrMsg, errorMessage);
            }
        };
        return $.ajax(option).then((response) => {
            return response;
        });
    }
    ProcessPaymetToBackend() {
        if (this.Is3DSecureEnabled === false) {
            this.PostSubmitPayment();
            return;
        }
        let request3DSecure = this.Getrequest3DSecure();
        request3DSecure.DealToSaveJSON = JSON.stringify(this.GetDataToSend());
        this._3DSecureService.ShouldCanStart(request3DSecure)
            .fail((err) => {
            Loaders.Hide();
            MyAlert.ShowError("אירעה שגיאה, יש ליצור קשר עם בית העסק", "3DS הודעה");
            console.error("3DSecure ::: ", err);
            this.afterPaymentSubmit();
        })
            .done((response) => {
            const shouldDo = response.ShouldDo;
            const canDoResult = response.CanDo;
            const initialResponse = response.InitialStep;
            if (shouldDo.ShouldDo === false || canDoResult.CanSkipAuthentication) {
                this.PostSubmitPayment();
            }
            else if (canDoResult.CanDo === false) {
                Loaders.Hide();
                if (canDoResult.ErrorCode == 60000447)
                    MyAlert.ShowError("מספר כרטיס שגוי", "הודעה");
                else
                    MyAlert.ShowError("כרטיס לא נתמך, יש לשנות להחליף לכרטיס אחר", "הודעה");
                this.afterPaymentSubmit();
            }
            else {
                var today = new Date();
                var _date = new Date('2024-08-12');
                if (today >= _date) {
                    if (!request3DSecure.CardholderPhone && !request3DSecure.CardHolderEmail) {
                        Loaders.Hide();
                        this.afterPaymentSubmit();
                        MyAlert.ShowError("חובה למלא טלפון או אימייל", "3DS הודעה");
                        return;
                    }
                }
                this._3DSecureTranId = initialResponse._3ds_trxid;
                switch (initialResponse.ResponseCode) {
                    case Cardcom3DSecureResponseCode.PassOver3DSecureAuth:
                    case Cardcom3DSecureResponseCode.Auth: {
                        this.PostSubmitPayment();
                        break;
                    }
                    case Cardcom3DSecureResponseCode.FingerPrint: {
                        this._3DSecureService.StartDeviceFingerPrint(initialResponse)
                            .then((result) => {
                            if (result && result.ResponseCode == 2) {
                                this.DeviceFingerPrint3DSecureFunc(result);
                            }
                            else if (!result) {
                                Loaders.Hide();
                                MyAlert.ShowError("אירעה שגיאה לא צפויה, נא לפנות לבית העסק", "הודעת שגיאה");
                            }
                        })
                            .fail((error) => {
                            Loaders.Hide();
                            MyAlert.ShowError("אירעה שגיאה לא צפויה, נא לפנות לבית העסק", "הודעת שגיאה");
                            console.error("3DSecure fingerprint timeout ::: ", error);
                        });
                        this.WaitForDeviceFingerprintResponse();
                        break;
                    }
                    case Cardcom3DSecureResponseCode.CardHolderChellenge: {
                        Loaders.Hide();
                        let CardholderChallengePromise = this._3DSecureService.StartCardholderChallenge(initialResponse);
                        if (initialResponse._3ds_version.substring(0, "1.".length) !== "1.")
                            CardholderChallengePromise.done(this.CardholderChallenge3DSecureFunc);
                        break;
                    }
                    case Cardcom3DSecureResponseCode.RejectAuth:
                    case Cardcom3DSecureResponseCode.FailAuth: {
                        Loaders.Hide();
                        let msg = initialResponse.ResponseCode === Cardcom3DSecureResponseCode.RejectAuth ? "אימות סורב" : "אימות נכשל";
                        MyAlert.ShowError(msg, "הודעה");
                        window.location.href = this.ErrorRedirectUrl;
                        break;
                    }
                    case Cardcom3DSecureResponseCode.FailError: {
                        Loaders.Hide();
                        MyAlert.ShowError(initialResponse.ErrorDescToUser, "הודעת שגיאה");
                        break;
                    }
                    default: {
                        Loaders.Hide();
                        MyAlert.ShowError("אירעה שגיאה לא צפויה, נא לפנות לבית העסק", "הודעת שגיאה");
                        console.log("The unknown response ::: ", JSON.stringify(initialResponse));
                        break;
                    }
                }
            }
        });
    }
    WaitForDeviceFingerprintResponse() {
        window.addEventListener("message", (event) => {
            if (event.data != undefined && event.data != null) {
                const data = event.data;
                if (data && data.indexOf('ThreeDSecureDeviceFingerprintResult_') != -1) {
                    const response = data.replace('ThreeDSecureDeviceFingerprintResult_', '');
                    const deviceFingerprintResponse = JSON.parse(response);
                    this._3DSecureService.AfterDeviceFingerPrint(deviceFingerprintResponse)
                        .then((result) => {
                        if (result) {
                            this.DeviceFingerPrint3DSecureFunc(result);
                        }
                    })
                        .fail((error) => {
                        Loaders.Hide();
                        MyAlert.ShowError("אירעה שגיאה לא צפויה, נא לפנות לבית העסק", "הודעת שגיאה");
                        console.error("3DSecure ::: ", error);
                    });
                }
            }
        }, false);
    }
    PostSubmitPayment() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.IsRecaptchaActive && this.RecaptchaVersion === 'v3') {
                yield this.updateGoogleTokenV3();
            }
            let dataToSend = this.GetDataToSend();
            if (this.Is3DSecureEnabled)
                dataToSend._3DSecureReq = this.Getrequest3DSecure();
            let ajaxOption = {
                type: 'POST',
                url: '/api/EA4/SubmitPayment',
                dataType: 'json',
                contentType: "application/json",
                data: JSON.stringify(dataToSend),
                error: (jqXHR, exception) => { this.ServerRequestError(jqXHR, exception); }
            };
            $.ajax(ajaxOption).done((data) => {
                if (data.RespId == 0) {
                    this.ProccessSuccess(data);
                }
                else {
                    this.ServerError(data);
                }
            }).fail(() => {
            }).always(this.afterPaymentSubmit);
        });
    }
    SubmitApplePayPayment() {
        var _a, _b, _c;
        Loaders.Show();
        this.payBtnSubmitPressCounter++;
        let dataToSend = this.GetDataToSend();
        dataToSend.ApplePayToken = this.ApplePayPaymentToken;
        const cardOwnerName = (_b = (_a = dataToSend.creditcardInfo) === null || _a === void 0 ? void 0 : _a.cardOwnerName) !== null && _b !== void 0 ? _b : (_c = dataToSend.invoiceInfo) === null || _c === void 0 ? void 0 : _c.Name;
        if (cardOwnerName == undefined || cardOwnerName == null || cardOwnerName == '') {
            MyAlert.ShowError('שם בעל הכרטיס חובה', 'שגיאה');
            Loaders.Hide();
            return;
        }
        let ajaxOption = {
            type: 'POST',
            url: '/api/EA4/SubmitApplePayPayment',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            error: (jqXHR, exception) => { this.ServerRequestError(jqXHR, exception); }
        };
        $.ajax(ajaxOption).done((data) => {
            if (data.RespId == 0) {
                this.ProccessSuccess(data);
            }
            else {
                this.ServerError(data);
            }
        }).fail(() => {
        }).always(() => {
            Loaders.Hide();
            this.afterPaymentSubmit();
        });
    }
    SubmitGooglePayPayment() {
        Loaders.Show();
        this.payBtnSubmitPressCounter++;
        let dataToSend = this.GetDataToSend();
        dataToSend.GooglePayToken = this.GooglePayPaymentToken;
        let ajaxOption = {
            type: 'POST',
            url: '/api/EA4/SubmitGooglePayPayment',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(dataToSend),
            error: (jqXHR, exception) => { this.ServerRequestError(jqXHR, exception); }
        };
        $.ajax(ajaxOption).done((data) => {
            if (data.RespId == 0) {
                this.ProccessSuccess(data);
            }
            else {
                this.ServerError(data);
            }
        }).fail(() => {
        }).always(() => {
            Loaders.Hide();
            this.afterPaymentSubmit();
        });
    }
}
class FullScreenManager extends ManagerBase {
    constructor(params) {
        super(params);
        this.ImageAlt = '';
        this.ImageVisibility = ko.observable(false);
        this.ImageUrl = '';
        this.AfterCompanyLogo = ko.observable('');
        this.GroupComments = ko.observable('');
        this.GroupCommentsVisible = ko.observable(true);
        this.AfterCompanyLogoVisible = ko.observable(true);
        this.CardcomFooterLogo = ko.observable('/Images/cardlogoHe.png');
        if (params.EA4Init.ImageVisiblity) {
            this.ImageVisibility(params.EA4Init.ImageVisiblity);
            this.ImageUrl = params.EA4Init.ImageUrl;
            this.ImageAlt = params.EA4Init.ImageAlt;
        }
        if (params.EA4Init.lang !== 'he') {
            this.CardcomFooterLogo('https://secure.cardcom.solutions/Images/CardComlogoEN.png');
        }
        this.AfterCompanyLogo(params.EA4Init.AfterCompanyLogo);
        this.GroupComments(params.EA4Init.GroupComments);
        this.UseVisaCalVisible = params.EA4Init.UseVisaCalVisible;
        this.UseVisaVisible = params.EA4Init.UseVisaVisible;
        this.UseMasterCardVisible = params.EA4Init.UseMasterCardVisible;
        this.UseAmericanExpressVisible = params.EA4Init.UseAmericanExpressVisible;
        this.UseDinersVisible = params.EA4Init.UseDinersVisible;
        this.UseIsraCardVisible = params.EA4Init.UseIsraCardVisible;
        this.UseLeumiCardVisible = params.EA4Init.UseLeumiCardVisible;
        this.UseGPayVisible = params.EA4Init.UseGPayVisible;
        $(document.body).css('background', '');
    }
    ShowController() {
        this.IsOnPaymentScreen(false);
        switch (this.controllerArray[this.pageIndex]().name) {
            case 'DealInfo':
                this.ShowDealInfo();
                break;
            case 'CreditCardPayment':
                this.ShowCreditCardInfo();
                this.IsOnPaymentScreen(true);
                break;
            case 'InvoiceToInformation':
                this.ShowInvoiceInfo();
                break;
            case 'CustomFields':
                this.ShowCustomFields();
                break;
        }
        if (this.pageIndex == 0) {
            this.GroupCommentsVisible(true);
            this.AfterCompanyLogoVisible(true);
            this.NextBtnVisible(true);
            this.PreviousBtnVisible(false);
            this.PayBtnVisible(false);
        }
        else if (this.pageIndex == this.controllerArray.length - 1) {
            this.GroupCommentsVisible(false);
            this.AfterCompanyLogoVisible(false);
            this.NextBtnVisible(false);
            this.PreviousBtnVisible(true);
            this.PayBtnVisible(true);
        }
        else if (this.pageIndex > 0) {
            this.GroupCommentsVisible(false);
            this.AfterCompanyLogoVisible(false);
            this.NextBtnVisible(true);
            this.PreviousBtnVisible(true);
            this.PayBtnVisible(false);
        }
    }
}
FullScreenManager.MyHTML = `<style>
    .modal-backdrop.in {
        opacity: 0.0 !important;
    }
    #CommissionTable{
        display:block;
    }
    .commissionTableFlex{
        display:flex;
        flex-wrap:wrap;
    }
    .commissionTableFlex .commissionTableFlexRow{
  		display:flex;
  		width:100%;
        justify-content:space-around;
    }
    .commissionTableFlexRow > .commissionTableFlexRowCol{
        width:20%;
        text-align:center;
    }
    #items-TotalInCoin.custom-label, #items-TotalInCoin-label.custom-label {
         margin-top:0.42em;
        direcdirectiontion:
    } 
    #currecny-select .form-control{
        padding-left:0;
        padding-right:0;
    }
</style>

<div class="full-screen">
    <div class="modal" tabindex="-1" role="dialog" id="mainPopupModal" data-bind="BsModal:true" data-backdrop="static" data-keyboard="false">
        <!-- LOGO -->
        <div class="modal-dialog">
            <div class="modal-content">
                <div id="ea4-cardcom-heat-text" class="container-fluid ea4-cardcom-heat-text">
                    <div class="row" data-bind="if: ImageVisibility">
                        <img id="ea4-head-image" class="img-responsive" data-bind="attr:{src:ImageUrl, alt:ImageAlt}, visible: ImageVisibility"/>
                    </div>
                    <h5 class="cardcom-head-text" data-bind="text: lang.ilblCardcomHeadText"></h5>
                    <div class="row" data-bind="visible:AfterCompanyLogoVisible">
                        <div class="col-md-12 after-company-logo" data-bind="html: AfterCompanyLogo "></div>
                    </div>
                    <div class="row group-comments-wrap" data-bind="visible:GroupCommentsVisible">
                        <div class="col-md-12 group-comments" id="group-comments-id" data-bind="html: GroupComments"></div>
                    </div>
                    <div class="row" id="whatsapp" data-bind="visible:whatsAppVisible">
                        <div class="col-md-12">
                            <a data-action="share/whatsapp/share" id="whatsapp-link" data-bind='attr:{href:whatsappLink}'>
                                <img src="https://secure.cardcom.solutions/images/Whatsapp.png" alt="Whatsapp">
                             </a>
                        </div>
                    </div>
                </div>

                <!-- Header -->
                <div id="ea4-modal-header" class="modal-header" data-bind="visible: isWizard">
                    <div>
                        <h4 id="modal-title-id" class="modal-title" data-bind="text: ModalHeader"></h4>
                    </div>
                </div>

                <div class="modal-body padding-25">

                    <div class="if-no-error-wrap" data-bind="ifnot:IsError">                        

                        <!-- Deal Info  (optional)-->
                        <div class="deal-info-wrap" data-bind="if:isToSowDealInfo">
                            <div class="deal-info-not-wizard-header-wrap" data-bind="ifnot:isWizard">
                                <h3 id="deal-info-purchase-head" data-bind="text:lang.ilblPurchaseHead"></h3>
                            </div>
                            <div class="deal-info-component-wrap" data-bind='component:{name: "deal-info",params:{ControlInit: controlInitDealInfo , ModuleRef:SetDealInfoToInformationRef,singleItemChoosed:false } },visible: DealInfoModalVisible,'>
                            </div>
                        </div>

                        <div data-bind="ifnot:SwitchDocumentAndCustomFieldsPositions">
                            <!-- Invoice details -->
                            <div class="invoice-wrap" data-bind="if:InvoiceModalVisible">
                                <div  class="invoice-not-wizard-header-wrap" data-bind="ifnot: isWizard">
                                    <h3 id="invoice-head" data-bind="text:lblInvoiceHead,visible:InvoiceModalVisible"></h3>
                                </div>
                                <div class="invoice-component-wrap" data-bind='component: {name: "invoice-to-information",params: { ControlInit: controlInitInvoiceToInformation , ModuleRef:SetInvoiceToInformationRef , SendDataToServer: SendPreBuyDataToServer }}, visible:InvoiceModalVisible'>
                                </div>
                            </div>

                            <!-- Custom fields -->
                            <div class="custom-fields-wrap" data-bind="if:CustomFieldsModalVisible">
                                <div class="custom-fields-not-wizard-header-wrap" data-bind="ifnot:isWizard">
                                    <h3 id="custom-fields-additional-details-header" data-bind="text:lang.ilblAdditionalDetaild"></h3>
                                </div>
                                <div class="custom-fields-component-wrap" data-bind='component:{name: "custom-fields",params:{ControlInit: controlInitCustomFields , ModuleRef:SetCustomFieldsToInformationRef } },visible: CustomFieldsModalVisible,'>
                                </div>
                            </div>
                        </div>

                        <div data-bind="if:SwitchDocumentAndCustomFieldsPositions">
                            <!-- Custom fields -->
                            <div class="custom-fields-wrap" data-bind="if:CustomFieldsModalVisible">
                                <div class="custom-fields-not-wizard-header-wrap" data-bind="ifnot:isWizard">
                                    <h3 id="custom-fields-additional-details-header" data-bind="text:lang.ilblAdditionalDetaild"></h3>
                                </div>
                                <div class="custom-fields-component-wrap" data-bind='component:{name: "custom-fields",params:{ControlInit: controlInitCustomFields , ModuleRef:SetCustomFieldsToInformationRef } },visible: CustomFieldsModalVisible,'>
                                </div>
                            </div>

                            <!-- Invoice details -->
                            <div class="invoice-wrap" data-bind="if:InvoiceModalVisible">
                                <div  class="invoice-not-wizard-header-wrap" data-bind="ifnot: isWizard">
                                    <h3 id="invoice-head" data-bind="text:lblInvoiceHead,visible:InvoiceModalVisible"></h3>
                                </div>
                                <div class="invoice-component-wrap" data-bind='component: {name: "invoice-to-information",params: { ControlInit: controlInitInvoiceToInformation , ModuleRef:SetInvoiceToInformationRef , SendDataToServer: SendPreBuyDataToServer }}, visible:InvoiceModalVisible'>
                                </div>
                            </div>
                        </div>

                         <!-- Creditcard details -->
                        <div id="creditcard-wrap" data-bind="visible:CreditCardModalSectionVisible">

                            <div class="row">
                                <h3 id="creditcard-payment-header" data-bind="text:lang.SelectPayment, visible:PaymentHeaderVisibe"></h3>
                            </div>

                            <div class="row paypal-wrap">
                                <div class="creditcard-paypal-active-wrap" data-bind="if:PayPalActive,visible:PayPalBtnVisible">
                                    <img class="img-responsive" id="PayUsingPayPal" style="cursor: pointer" data-bind="attr: {src:PayPalBtnSrc},
                                        value: PayPalBtn ,
                                        click:HandlePayPalBtnSubmit,
                                        visible:PayPalBtnVisible,
                                        disable:ShouldDisableSubmitBtn" alt="Pay using PayPal" />
                                    <h3 data-bind="text:' ' , visible:showCreditCardHeaderifPayPalActive">paypal-bit seperator</h3>
                                </div>
                            </div>

                            <div class="row uPayBit-wrap">
                                <div data-bind="if:uPayBit_BtnActive,visible:BitBtnVisible">
                                    <div class="uPayBitContainer">
                                        <button id="bit-payment-button" type="button" data-bind="click: Handle_uPayBit_BtnSubmit">
                                        </button>
                                    </div>
                                </div>

                                <div data-bind="if:PayMeBitBtnActive,visible:BitBtnVisible">
                                    <div class="BitContainer">
                                        <button id="bit-payment-button" type="button" data-bind="click: Handle_PayMeBitBtnClick">
                                        </button>
                                        <div id="payme-container-div">
                                            <label class="payme-payment-txt" data-bind="text: PayMePaymentText"></label>
                                            <label class="payme-payment-txt error" data-bind="text: PayMePaymentError"></label>
                                            <div id="payme-countdown" class="payme-payment-txt" data-bind="visible: ShowPayMeCountdown"></div>
                                            <iframe id="PayMeIframe" data-bind="visible: PayMeIframeSrc, attr: { src: PayMeIframeSrc }" width="250" height="250" frameBorder="0"></iframe>
                                        </div>
                                    </div>
                                </div>

                               <div data-bind="if:CardcomBitBtnActive,visible:BitBtnVisible">
                                    <div class="BitContainer">
                                        <button id="bit-payment-button" type="button" data-bind="click: Handle_CardcomBitBtnClick">
                                        </button>
                                        <div id="cardcom-bit-container-div" data-bind="visible: ShowCardcomBitDiv">
                                            <!-- ko if: CardcomBitUrl-->
                                            <a id="cardcom-bit-ref" data-bind="text: CardcomBitUrlText, attr: {href:CardcomBitUrl, target:'_blank'}" style="text-decoration:none; font-weight:bold;"></a>
                                            <!-- /ko -->
                                            <label class="cardcom-bit-payment-txt" data-bind="text: CardcomBitPaymentText"></label>
                                            <label class="cardcom-bit-payment-txt error" data-bind="text: CardcomBitPaymentError"></label>
                                            <div id="cardcom-bit-countdown" class="cardcom-bit-payment-txt" data-bind="visible: ShowCardcomBitCountdown"></div>
                                            <img id="qrBarcode" data-bind="if:CardcomBitQrBarcodeUrl, attr: {src:CardcomBitQrBarcodeUrl}" width="200" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row apple-pay-wrap">
                                <div class="ApplePayDiv" data-bind="if: IsApplePayActive">
                                    <div id="apple-pay-button-setup" class="apple-pay apple-pay-button button-with-text button-text-setup" lang="he"
                                            data-bind="attr: { lang : lang }, click:attemptApplePaySetup, visible: IsApplePaySetup">
                                    </div>
                                    <div id="apple-pay-button-start" class="apple-pay apple-pay-button button-with-text button-color-black" lang="he"
                                            data-bind="attr: { lang : lang }, click: startApplePay, visible: IsApplePayPayment">
                                        <span class="logo logo-color-white"></span>
                                    </div>
                                </div>
                            </div>

                            <h3 data-bind="text:lang.PayUaingCreditCard , visible:showCreditCardHeader"></h3>

                            <div class="creditcard-not-wizardAndPaypal-wrap" data-bind="if: notWizardAndPaypal">
                                <h3 id="creditcard-header" data-bind="text:lang.ilblCreditCardHead , visible:showCreditCardHeader"></h3>
                            </div>

                            <div class="creditcard-component-wrap" data-bind='component: {name: "credit-card-payment-for-popup",params: { ControlInit: controlInitCreditCardPaymentForPopup,InnerModal:{ modal:controlInitDealInfo,visible: isToSowDealInfo, HideCardOnZero:IsHideCardOnZero}, ModuleRef:SetCreditCardPaymentRef, OpenUseTermModal: ShowPopup, SendDataToServer: SendPreBuyDataToServer }},visible:CreditCardModalSectionVisible'>
                            </div>

                        </div>

                        <!-- Allow Merchant Emails -->
                        <div class="row margin-bottom-row" data-bind="if:CheckboxForAllowForMerchantMessages, visible: CreditCardModalSectionVisible">
                            <div class="col-xs-12 col-md-12" >
                                <div class="input-group">
                                    <label data-bind="text:lang.IApproveGettingMerchantMessages"></label>
                                    <input class="allow-merchant-msg-checkbox custom-input" type="checkbox" data-bind="checked:allowMerchantMessages.booleanValue"/>
                                </div>
                                <div class="alert alert-danger no-top-bottom-padding" role="alert"
                                data-bind="html:allowMerchantMessages.ErrorListToShowHTML, visible: allowMerchantMessages.showError,attr:{id:allowMerchantMessages.id+'ErrorBlock'}">
                                </div>
                            </div>
                        </div>

                        <!-- Use Term  -->
                        <div class="row margin-bottom-row use-term-wrap" data-bind="visible:IsToShowUseTermCb">
                          <div class="col-xs-12 col-md-12">
                            <div class="input-group" data-bind="hide:agreementnew.hide, css:agreementnew.CssValid">
                                <a data-bind="click:ShowUseTermPopup, text:lang.IHaveReadTheAgreementlit2"></a>
                                <input class="agreementchkbox custom-input" type="checkbox" data-bind="checked:agreementnew.booleanValue,
                                    attr: {id:agreementnew.id,title:lang.IHaveReadTheAgreementlit2,
                                        'aria-invalid': !agreementnew.isValid(),
                                        'aria-describedby':agreementnew.id+'ErrorBlock',
                                        'aria-required': agreementnew.Required},">
                            </div>
                            <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:agreementnew.ErrorListToShowHTML,
                                 visible: agreementnew.showError, attr:{id:agreementnew.id+'ErrorBlock'}"></div>
                          </div>
                        </div>

                        <!-- Payment commission Table  -->
                        <div data-bind="if: ShowApprovecommition" >
                        <span data-bind="visible:IsToShowCommitionTable"> 
                            <div class="row margin-bottom-row use-term-wrap">
                              <div class="col-xs-12 col-md-12">
                                <div class="input-group" data-bind="hide:approceCommitionTable.hide, css:approceCommitionTable.CssValid">
                                    <a data-bind="click:ShowComittionInfo, text:lang.IApproveCommition"></a>
                                    <input class="agreementchkbox custom-input" type="checkbox" data-bind="checked:approceCommitionTable.booleanValue,
                                        attr: {id:approceCommitionTable.id,title:lang.IApproveCommition,
                                            'aria-invalid': !approceCommitionTable.isValid(),
                                            'aria-describedby':approceCommitionTable.id+'ErrorBlock',
                                            'aria-required': approceCommitionTable.Required},">
                              </div>
                            </div>
                            <div id="CommissionTable" style="display:none;"></div>

                            <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:approceCommitionTable.ErrorListToShowHTML,
                                     visible: approceCommitionTable.showError, attr:{id:approceCommitionTable.id+'ErrorBlock'}"></div>
                            </div>
                        </span>
                        </div>
                        <!-- Comments -->
                        <div class="comments-wrap" data-bind="visible:CompanyFootInfoVisible" class="row">
                           <div class="col-xs-12 col-md-12">
                            <div id="footer-comments" class="alert alert-info" role="alert" data-bind="text:CompanyFootInfo"></div>
                          </div>
                        </div>

                        <!-- Google Recaptcha  -->
                        <div data-bind="if:IsRecaptchaActive && RecaptchaVersion !== 'v3' "">
                            <div id="captcha_container" render="explicit" style="display: flex; justify-content: center; padding: 20px"></div>
                        </div>

                        <!--Submit  -->
                        <div id="ea4-submit-btn-fs" data-bind="ifnot:isWizard">
                            <div class="row">
                               <div class="col-xs-12 col-md-12">
                        <!-- PayBtnSubmit is duplicated 4 times! -->
                                <input type="button" class="btn btn-primary btnSubmitDeal" data-bind="value: SubmitBtn , click:PayBtnSubmit,visible:PayBtnVisible,disable:ShouldDisableSubmitBtn" />
                               </div>
                            </div>

                        </div>

                        <div class="row margin-bottom-10 ea4-btn-section">                           
                             <div class="col-xs-6 no-padding-left-rigth" data-bind="visible:isWizard">
                                <input type="button" class="btn btn-primary " data-bind="value: lang.PreviousBtn , click:PreviousBtn, visible: PreviousBtnVisible" />
                            </div>

                            <!-- if Wizard-->
                            <div class="col-xs-6 no-padding-left-rigth" id="nextBtn" data-bind="visible:isWizard">
                            
                            <!-- PayBtnSubmit is duplicated 4 times! -->
                                <input type="button" class="btn btn-primary  btn-block btnSubmitDeal" data-bind="value: SubmitBtn , click:PayBtnSubmit,visible:PayBtnVisible,disable:ShouldDisableSubmitBtn" />
                               
                                <input type="button" class="btn btn-primary btnSubmitDeal" data-bind="value: lang.NextBtn , click:NextBtn, visible:NextBtnVisible" />
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

        <footer class="ea4-footer" style="margin: 10px auto 50px auto; text-align:center;">
            <img id="pcidss-img-footer" src='https://secure.cardcom.solutions/Images/LowProfile5/pciLogo.png' alt="PCI DSS" />
                <img id="cardcom-logo-img-footer" data-bind="attr:{src:CardcomFooterLogo }" alt="Cardcom" />
          <!--  <a  id="cardcom-logo-link-footer" href="https://www.cardcom.solutions" target="_blank">
                
            </a> -->
            <div class="ea4-footer" data-bind="html:lang.ilblCardcomFoot"></div>
        </footer>
        <div class="CreditCardCompany">
            <img src="/Images/Logos/leumi_card.gif" data-bind="visible:UseLeumiCardVisible" alt="leumi_card" id="UseLeumiCard" height="30" />
            <img src="/Images/Logos/visa_cal.gif" data-bind="visible:UseVisaCalVisible" alt="visa_cal" id="UseVisaCal" height="30" />
            <img src="/Images/Logos/visa.gif" data-bind="visible:UseVisaVisible" alt="visa" id="UseVisa" height="30" />
            <img src="/Images/Logos/mastercard.gif" data-bind="visible:UseMasterCardVisible" alt="mastercard" id="UseMasterCard" height="30" />
            <img src="/Images/Logos/american_express.gif" data-bind="visible:UseAmericanExpressVisible" alt="american_express" id="UseAmericanExpress" height="30" />
            <img src="/Images/Logos/diners.gif" alt="diners" data-bind="visible:UseDinersVisible" id="UseDiners" height="30" />
            <img src="/Images/Logos/isracard.gif" data-bind="visible:UseIsraCardVisible" alt="isracard" id="UseIsraCard" height="30" />
            <img src="/Images/Logos/GPay_Acceptance_Mark_800.png" data-bind="visible:UseGPayVisible" alt="GPay" id="UseGPay" height="30" max-width="65" />
        </div>
    </div>

    <!--Term of use popup  -->
    <div class="modal useTermModal-wrap" tabindex="-1" role="dialog" id="useTermModal" data-bind="BsModal:isToShowUseTerm" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog  modal-lg" style="width:auto;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" id="modalCloseBtn" data-bind="click:CloseUseTerm" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" data-bind="text:useTernHeader"></h4>
                </div>
                <div class="modal-body">
                    <iframe data-bind="attr : {src:useTermLink}" style="width:100%; height:85vh;"></iframe>

                </div>
            </div>
        </div>
    </div>

    <!-- Success popup -->
    <div class="modal error-modal success-popup-wrap" tabindex="-1" role="dialog" id="useTermModal" data-bind="BsModal:isToShowSuccessPopup" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog  modal-sm">
            <div class="modal-content">
                <div class="modal-body">
                    <label data-bind="text:SuccessMessage"></label>
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
class PopUpManager extends ManagerBase {
    constructor(params) {
        super(params);
        this.ProccessSuccess = (data) => {
            var d = data.Data;
            if (window.self !== window.top) {
                if (d.ShowCardOunwerID) {
                    Loaders.Hide();
                    this.creditCardPayment().cardUserId.hide(false);
                    this.creditCardPayment().cardUserId.SetIsValid(false);
                    MyAlert.ShowError(d.Message, this.lang.Error);
                    return;
                }
                if (d.Redirect) {
                    if (data.Data.ShowSuccessPopUp) {
                        Loaders.Hide();
                        this.SuccessMessage(d.Message);
                        this.isToShowSuccessPopup(true);
                        setTimeout(() => {
                            this.CloseFrame('Redirect-' + d.RedirectAddress);
                        }, 3 * 1000);
                    }
                    else {
                        this.CloseFrame('Redirect-' + d.RedirectAddress);
                    }
                    return;
                }
                if (d.Retray) {
                    Loaders.Hide();
                    MyAlert.ShowError(d.Message, this.lang.Error);
                    return;
                }
            }
            else {
                window.location.href = d.RedirectAddress;
            }
        };
        this.CloseFrame = (command) => {
            if (window.self !== window.top) {
                parent.postMessage(command, '*');
            }
            else {
                window.location.href = this.qeryparams[0].ReturnToUrl;
            }
        };
    }
    ShowController() {
        this.IsOnPaymentScreen(false);
        switch (this.controllerArray[this.pageIndex]().name) {
            case 'DealInfo':
                this.ShowDealInfo();
                break;
            case 'CreditCardPayment':
                this.ShowCreditCardInfo();
                this.IsOnPaymentScreen(true);
                break;
            case 'InvoiceToInformation':
                this.ShowInvoiceInfo();
                break;
            case 'CustomFields':
                this.ShowCustomFields();
                break;
        }
        if (this.pageIndex == 0) {
            this.NextBtnVisible(true);
            this.PreviousBtnVisible(false);
            this.PayBtnVisible(false);
        }
        else if (this.pageIndex == this.controllerArray.length - 1) {
            this.NextBtnVisible(false);
            this.PreviousBtnVisible(true);
            this.PayBtnVisible(true);
        }
        else if (this.pageIndex > 0) {
            this.NextBtnVisible(true);
            this.PreviousBtnVisible(true);
            this.PayBtnVisible(false);
        }
    }
}
PopUpManager.MyHTML = `<div class="popup-manager">

    <div class="modal" tabindex="-1" role="dialog" id="mainPopupModal" data-bind="BsModal:true" data-backdrop="static" data-keyboard="false">

        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Header -->
                <div id="ea4-modal-header" class="modal-header">
                    <button type="button" id="modalCloseBtn" data-bind="click:function(){ CloseFrame('Success');}" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <div class="modal-title-wrap" data-bind="if: isWizard">
                        <h4 id="modal-title-id" class="modal-title" data-bind="text: ModalHeader"></h4>
                    </div>
                    <div id="if-not-wizart-show-br" data-bind="ifnot: isWizard">
                        <br />
                    </div>
                </div>
                <div id="ea4-cardcom-heat-text" class="container-fluid ea4-cardcom-heat-text">
                        <h5 id="cardcom-head-text" class="cardcom-head-text" data-bind="text: lang.ilblCardcomHeadText"></h5>
                </div>

                <div class="modal-body padding-25">

                    <div class="if-no-error-wrap" data-bind="ifnot:IsError">

                        <!-- Deal Info  (optional)-->
                        <div class="deal-info-wrap" data-bind="if:isToSowDealInfo">
                            <div class="deal-info-not-wizard-header-wrap" data-bind="ifnot:isWizard">
                                <h3 id="deal-info-purchase-head" data-bind="text:lang.ilblPurchaseHead"></h3>
                            </div>
                            <div class="deal-info-component-wrap" data-bind='component:{name: "deal-info",params:{ControlInit: controlInitDealInfo , ModuleRef:SetDealInfoToInformationRef,singleItemChoosed:false } },visible: DealInfoModalVisible,'>
                            </div>
                        </div>

                      
<div data-bind="ifnot:SwitchDocumentAndCustomFieldsPositions">
                            <!-- Invoice details -->
                            <div class="invoice-wrap" data-bind="if:InvoiceModalVisible">
                                <div  class="invoice-not-wizard-header-wrap" data-bind="ifnot: isWizard">
                                    <h3 id="invoice-head" data-bind="text:lblInvoiceHead,visible:InvoiceModalVisible"></h3>
                                </div>
                                <div class="invoice-component-wrap" data-bind='component: {name: "invoice-to-information",params: { ControlInit: controlInitInvoiceToInformation , ModuleRef:SetInvoiceToInformationRef , SendDataToServer: SendPreBuyDataToServer }}, visible:InvoiceModalVisible'>
                                </div>
                            </div>

                            <!-- Custom fields -->
                            <div class="custom-fields-wrap" data-bind="if:CustomFieldsModalVisible">
                                <div class="custom-fields-not-wizard-header-wrap" data-bind="ifnot:isWizard">
                                    <h3 id="custom-fields-additional-details-header" data-bind="text:lang.ilblAdditionalDetaild"></h3>
                                </div>
                                <div class="custom-fields-component-wrap" data-bind='component:{name: "custom-fields",params:{ControlInit: controlInitCustomFields , ModuleRef:SetCustomFieldsToInformationRef } },visible: CustomFieldsModalVisible,'>
                                </div>
                            </div>
                        </div>

                        <div data-bind="if:SwitchDocumentAndCustomFieldsPositions">
                            <!-- Custom fields -->
                            <div class="custom-fields-wrap" data-bind="if:CustomFieldsModalVisible">
                                <div class="custom-fields-not-wizard-header-wrap" data-bind="ifnot:isWizard">
                                    <h3 id="custom-fields-additional-details-header" data-bind="text:lang.ilblAdditionalDetaild"></h3>
                                </div>
                                <div class="custom-fields-component-wrap" data-bind='component:{name: "custom-fields",params:{ControlInit: controlInitCustomFields , ModuleRef:SetCustomFieldsToInformationRef } },visible: CustomFieldsModalVisible,'>
                                </div>
                            </div>

                            <!-- Invoice details -->
                            <div class="invoice-wrap" data-bind="if:InvoiceModalVisible">
                                <div  class="invoice-not-wizard-header-wrap" data-bind="ifnot: isWizard">
                                    <h3 id="invoice-head" data-bind="text:lblInvoiceHead,visible:InvoiceModalVisible"></h3>
                                </div>
                                <div class="invoice-component-wrap" data-bind='component: {name: "invoice-to-information",params: { ControlInit: controlInitInvoiceToInformation , ModuleRef:SetInvoiceToInformationRef , SendDataToServer: SendPreBuyDataToServer }}, visible:InvoiceModalVisible'>
                                </div>
                            </div>
                        </div>

                            <div class="row">
                                <h3 id="creditcard-payment-header" data-bind="text:lang.SelectPayment, visible:PaymentHeaderVisibe"></h3>
                            </div>

                       <div class="row paypal-wrap">
                            <div class="creditcard-paypal-active-wrap" data-bind="if:PayPalActive,visible:PayPalBtnVisible">
                                <img class="img-responsive" id="PayUsingPayPal" style="cursor: pointer" data-bind="attr: {src:PayPalBtnSrc},
                                    value: PayPalBtn ,
                                    click:HandlePayPalBtnSubmit,
                                    visible:PayPalBtnVisible,disable:ShouldDisableSubmitBtn" />
                                <h3 data-bind="text:' ' , visible:showCreditCardHeaderifPayPalActive">paypal-bit seperator</h3>
                            </div>
                        </div>

                        <div class="row uPayBit-wrap">
                                <div data-bind="if:uPayBit_BtnActive,visible:BitBtnVisible">
                                    <div class="uPayBitContainer">
                                        <button id="bit-payment-button" type="button" data-bind="click: Handle_uPayBit_BtnSubmit">
                                        </button>
                                    </div>
                                </div>

                                <div data-bind="if:PayMeBitBtnActive,visible:BitBtnVisible">
                                    <div class="BitContainer">
                                        <button id="bit-payment-button" type="button" data-bind="click: Handle_PayMeBitBtnClick">
                                        </button>
                                    </div>
                                </div>

                               <div data-bind="if:CardcomBitBtnActive,visible:BitBtnVisible">
                                    <div class="BitContainer">
                                        <button id="bit-payment-button" type="button" data-bind="click: Handle_CardcomBitBtnClick">
                                        </button>
                                        <div id="cardcom-bit-container-div" data-bind="visible: ShowCardcomBitDiv">
                                        <!-- ko if: CardcomBitUrl-->
                                        <a id="cardcom-bit-ref" data-bind="text: CardcomBitUrlText, attr: {href:CardcomBitUrl, target:'_blank'}" style="text-decoration:none; font-weight:bold;"></a>
                                        <!-- /ko -->
                                            <label class="cardcom-bit-payment-txt" data-bind="text: CardcomBitPaymentText"></label>
                                            <label class="cardcom-bit-payment-txt error" data-bind="text: CardcomBitPaymentError"></label>
                                            <div id="cardcom-bit-countdown" class="cardcom-bit-payment-txt" data-bind="visible: ShowCardcomBitCountdown"></div>
                                            <img id="qrBarcode" data-bind="if:CardcomBitQrBarcodeUrl, attr: {src:CardcomBitQrBarcodeUrl}" width="200" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row apple-pay-wrap">
                                <div class="ApplePayDiv" data-bind="if: IsApplePayActive">
                                    <div id="apple-pay-button-setup" class="apple-pay apple-pay-button button-with-text button-text-setup" lang="he"
                                            data-bind="attr: { lang : lang }, click:attemptApplePaySetup, visible: IsApplePaySetup">
                                    </div>
                                    <div id="apple-pay-button-start" class="apple-pay apple-pay-button button-with-text button-color-black" lang="he"
                                            data-bind="attr: { lang : lang }, click: startApplePay, visible: IsApplePayPayment">
                                        <span class="logo logo-color-white"></span>
                                    </div>
                                </div>
                            </div>

                        <!-- Creditcard details -->
                        <h3 data-bind="text:lang.PayUaingCreditCard , visible:showCreditCardHeader"></h3>
                        <div class="creditcard-not-wizardAndPaypal-wrap" data-bind="if: notWizardAndPaypal">
                            <h3 d="creditcard-header" data-bind="text:lang.ilblCreditCardHead , visible:showCreditCardHeader"></h3>
                        </div>
                        <div class="creditcard-component-wrap" data-bind='component: {name: "credit-card-payment-for-popup",params: { ControlInit: controlInitCreditCardPaymentForPopup,InnerModal:{ modal:controlInitDealInfo,visible: isToSowDealInfo, HideCardOnZero:IsHideCardOnZero}, ModuleRef:SetCreditCardPaymentRef, OpenUseTermModal: ShowPopup, SendDataToServer: SendPreBuyDataToServer}},visible:CreditCardModalSectionVisible'>
                        </div>

                        <!-- Allow Merchant Emails -->
                        <div class="row margin-bottom-row" data-bind="if:CheckboxForAllowForMerchantMessages">
                            <div class="col-xs-12 col-md-12" >
                                <div class="input-group">
                                    <label data-bind="text:lang.IApproveGettingMerchantMessages"></label>
                                    <input class="allow-merchant-msg-checkbox custom-input" type="checkbox" data-bind="checked:allowMerchantMessages.booleanValue"/>
                                </div>
                                <div class="alert alert-danger no-top-bottom-padding" role="alert"
                                data-bind="html:allowMerchantMessages.ErrorListToShowHTML, visible: allowMerchantMessages.showError,attr:{id:allowMerchantMessages.id+'ErrorBlock'}">
                                </div>
                            </div>
                        </div>

                        <!-- Use Term -->
                        <div class="row margin-bottom-row use-term-wrap" data-bind="visible:IsToShowUseTermCb">
                            <div class="input-group" data-bind="hide:agreementnew.hide, css:agreementnew.CssValid">
                                <a data-bind="click:ShowUseTermPopup, text:lang.IHaveReadTheAgreementlit2"></a>
                                <input class="agreementchkbox custom-input" type="checkbox" data-bind="checked:agreementnew.booleanValue,
                                    attr: {id:agreementnew.id,title:lang.IHaveReadTheAgreementlit2,
                                        'aria-invalid': !agreementnew.isValid(),
                                        'aria-describedby':agreementnew.id+'ErrorBlock',
                                        'aria-required': agreementnew.Required},">
                            </div>
                            <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:agreementnew.ErrorListToShowHTML,
                                 visible: agreementnew.showError, attr:{id:agreementnew.id+'ErrorBlock'}"></div>
                        </div>

                        <!-- Payment commission Table  -->
                         <div data-bind="if: ShowApprovecommition" >
                        <span data-bind="visible:IsToShowCommitionTable"> 
                            <div class="row margin-bottom-row use-term-wrap">
                                <div class="input-group" data-bind="hide:approceCommitionTable.hide, css:approceCommitionTable.CssValid">
                                    <a data-bind="click:ShowComittionInfo, text:lang.IApproveCommition"></a>
                                    <input class="agreementchkbox custom-input" type="checkbox" data-bind="checked:approceCommitionTable.booleanValue,
                                        attr: {id:approceCommitionTable.id,title:lang.IApproveCommition,
                                            'aria-invalid': !approceCommitionTable.isValid(),
                                            'aria-describedby':approceCommitionTable.id+'ErrorBlock',
                                            'aria-required': approceCommitionTable.Required},">
                            </div>
                            <div id="CommissionTable" style="display:none;"></div>

                            <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:approceCommitionTable.ErrorListToShowHTML,
                                     visible: approceCommitionTable.showError, attr:{id:approceCommitionTable.id+'ErrorBlock'}"></div>
                            </div>
                        </span>
                       </div>
                        <!-- Comments -->
                        <div class="comments-wrap" data-bind="visible:CompanyFootInfoVisible" class="row">
                            <div id="footer-comments" class="alert alert-info" role="alert" data-bind="text:CompanyFootInfo"></div>
                        </div>
                        <!--Submit  -->
                        <div id="ea4-submit-btn-fs" data-bind="ifnot:isWizard">

                        <!--Google Recaptcha  -->
                        <div data-bind="if:IsRecaptchaActive"">
                            <div id="captcha_container" style="display: flex; justify-content: center; padding: 20px"></div>
                        </div>
<!-- PayBtnSubmit is duplicated 4 times! -->
                            <input type="button" class="btn btn-primary btnSubmitDeal" data-bind="value: SubmitBtn , click:PayBtnSubmit,visible:PayBtnVisible,disable:ShouldDisableSubmitBtn " />
                        </div>

                        <div class="row margin-bottom-10 ea4-btn-section">

                            <div class="col-xs-6 no-padding-left-rigth" data-bind="visible:isWizard">
                                <input type="button" class="btn btn-primary " data-bind="value: lang.PreviousBtn , click:PreviousBtn, visible: PreviousBtnVisible" />
                            </div>
                            
                            <!-- if Wizard-->
                            <div class="col-xs-6 no-padding-left-rigth" id="nextBtn" data-bind="visible:isWizard">
                        <!--Google Recaptcha  -->
                        <div data-bind="if:ShowCaptchaInWizard,visible:PayBtnVisible">
                            <div id="captcha_container" style="display: flex; justify-content: center; padding: 20px"></div>
                        </div>
                                <!-- PayBtnSubmit is duplicated 4 times! -->
                                <input type="button" class="btn btn-primary  btn-block btnSubmitDeal " data-bind="value: SubmitBtn , click:PayBtnSubmit,visible:PayBtnVisible,disable:ShouldDisableSubmitBtn" />
                                
                                <!--<input type="button" class="btn btn-primary  btn-block" data-bind="value: PayPalBtn , click:HandlePayPalBtnSubmit,visible:PayPalBtnVisible,disable:ShouldDisableSubmitBtn" />-->
                                <input type="button" class="btn btn-primary" data-bind="value: lang.NextBtn , click:NextBtn, visible:NextBtnVisible" />
                            </div>
                        </div>
                        <div class="ea4-footer" data-bind="html:lang.ilblCardcomFoot" ></div>
                    </div>                   
                </div>
            </div>
        </div>
    </div>

    <!--Term of use popup  -->
    <div class="modal useTermModal-wrap" tabindex="-1" role="dialog" id="useTermModal" data-bind="BsModal:isToShowUseTerm" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog  modal-lg" style="width:auto;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" id="modalCloseBtn" data-bind="click:CloseUseTerm" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" data-bind="text:useTernHeader"></h4>
                </div>
                <div class="modal-body">
                    <iframe data-bind="attr : {src:useTermLink}" style="width:100%; height:85vh;"></iframe>
                </div>
            </div>
        </div>
    </div>

    <!-- Success popup -->
    <div class="modal error-modal success-popup-wrap" tabindex="-1" role="dialog" id="useTermModal" data-bind="BsModal:isToShowSuccessPopup" data-backdrop="static" data-keyboard="false">
        <div class="modal-dialog  modal-sm">
            <div class="modal-content">           
                <div class="modal-body">
                    <label data-bind="text:SuccessMessage"></label>
                    <div class="loader"></div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
ko['onError'] = function (error) {
    console.error(error);
    sendErrorToServer("knockout error:" + JSON.stringify(error), "", 0, true);
};
var Loaders;
(function (Loaders) {
    function Show() {
        try {
            Loaders.loader.show();
        }
        catch (err) {
            console.log(err);
        }
    }
    Loaders.Show = Show;
    function Hide() {
        try {
            Loaders.loader.hide();
        }
        catch (err) {
            console.log(err);
        }
    }
    Loaders.Hide = Hide;
    $(function () {
        try {
            Loaders.loader = $('body')['loadingIndicator']({
                useImage: false,
                showOnInit: false,
            }).data("loadingIndicator");
        }
        catch (err) {
            console.log(err);
        }
    });
})(Loaders || (Loaders = {}));
class Commission {
    constructor(initVals) {
        for (let key in initVals) {
            if (initVals[key] == null) {
                continue;
            }
            if (initVals.hasOwnProperty(key)) {
                if (!this.hasOwnProperty(key)) {
                    this[key] = initVals[key];
                }
                else if (ko.isObservable(this[key])) {
                    this[key](initVals[key]);
                }
                else {
                    this[key] = initVals[key];
                }
            }
        }
    }
}
function MyLog(msg) {
    if (typeof console != "undefined") {
        window.console.log(msg);
    }
}
var useSendToServer = 0;
function sendErrorToServer(message, uri, lineNumber, showAlert, columnNumber) {
    try {
        let UID = '0';
        if (window['EA4Init']) {
            if (window['EA4Init'].UID) {
                UID = window['EA4Init'].UID;
            }
        }
        MyLog(message);
        var haveProfile = true;
        try {
            var url = "/api/EA4/SendErrorData";
            var errorObj = {
                message: message,
                UID: UID,
                uri: uri,
                lineNumber: lineNumber,
                columnNumber: columnNumber !== undefined ? columnNumber : -1
            };
            if (useSendToServer <= 10) {
                useSendToServer = useSendToServer + 1;
                var json = ko.toJSON(errorObj);
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { "": json },
                    success: function () { },
                    dataType: "json"
                });
            }
        }
        catch (e) {
            MyLog("Error SendErrorData");
            var track = new Image();
            track.src = "/api/EA4/PixelErrorData?" +
                "message=" + encodeURIComponent(message) +
                "&UID=" + UID +
                "&uri=" + encodeURI(uri) +
                "&lineNumber=" + lineNumber +
                "&columnNumber=" + columnNumber;
            document.body.appendChild(track);
        }
    }
    finally {
        if (showAlert)
            alert(message);
    }
}
window.onerror = (message, uri, lineNumber, columnNumber) => {
    sendErrorToServer(message, uri, lineNumber, false, columnNumber);
    return true;
};
class Items {
    constructor(initVals) {
        this.desk = '';
        this.key = 0;
        this.price = 0;
        this.quantity = [];
        this.coin_type = 1;
        this.coinSing = "שח";
        this.coinAlfaCode = "";
        this.total = ko.pureComputed(() => {
            return this.price * this.selectedQuantity();
        });
        this.displayRowTotal = ko.pureComputed(() => {
            return number_format(this.price * this.selectedQuantity(), 2, '.', ',') + " " + this.coinSing;
        });
        this.displayPrice = ko.pureComputed(() => {
            return number_format(this.price, 2, '.', ',') + " " + this.coinSing;
        });
        this.payments = ko.observableArray([]);
        this.selectedQuantity = ko.observable(0);
        this.openSum = ko.observable();
        for (let key in initVals) {
            if (initVals[key] == null)
                continue;
            if (initVals.hasOwnProperty(key)) {
                if (!this.hasOwnProperty(key)) {
                    this[key] = initVals[key];
                }
                else if (ko.isObservable(this[key])) {
                    this[key](initVals[key]);
                }
                else {
                    this[key] = initVals[key];
                }
            }
        }
        if (initVals.IsSelectedInCart == true) {
            if (this.quantity.length >= 2) {
                this.selectedQuantity(this.quantity[1]);
            }
            else {
                this.selectedQuantity(0);
            }
        }
        else {
            this.selectedQuantity(0);
        }
    }
}
class MyAlert {
    constructor() {
        this.lang = langs.lan;
        this.ErrorText = ko.observable('');
        this.ErrorHeader = ko.observable('');
        this.isToShowErrorPopup = ko.observable(false);
        this.showHeader = ko.observable(false);
        this.CloseBtnTxt = 'Close';
        this.ErrorList = ko.observable('');
        this.CloseErrorPopup = () => {
            this.ErrorText('');
            this.ErrorHeader('');
            this.ErrorList('');
            this.isToShowErrorPopup(false);
        };
    }
    static GetClass() {
        if (MyAlert.alrt == null)
            MyAlert.alrt = new MyAlert();
        if (MyAlert.alrt.lang != null) {
            MyAlert.alrt.CloseBtnTxt = MyAlert.alrt.lang.Close;
        }
        return MyAlert.alrt;
    }
    static ShowError(ErrorText, ErrorHeader, showHeader = true) {
        if (MyAlert.alrt != null) {
            MyAlert.alrt.ErrorList('<label>' + ErrorText + '</label>');
            if (showHeader) {
                MyAlert.alrt.showHeader(true);
                MyAlert.alrt.ErrorHeader(ErrorHeader);
            }
            MyAlert.alrt.ErrorText(ErrorText);
            MyAlert.alrt.isToShowErrorPopup(true);
        }
    }
    static ShowErrorList(ErrorText, ErrorHeader, errorList, showHeader = true) {
        if (MyAlert.alrt != null) {
            let error = '<label>' + ErrorText + '</label><ul id="ErrorBlock"' + '>';
            for (let i in errorList.messages()) {
                error = error + '<li>' + errorList.messages()[i].message + '</li>';
            }
            error = error + '</ul>';
            MyAlert.alrt.ErrorList(error);
            if (showHeader) {
                MyAlert.alrt.showHeader(true);
                MyAlert.alrt.ErrorHeader(ErrorHeader);
            }
            MyAlert.alrt.isToShowErrorPopup(true);
        }
    }
}
MyAlert.alrt = null;
MyAlert.MyHTML = `<div class="modal error-modal" tabindex="-1" role="dialog" id="ErrorModal" data-bind="BsModal:isToShowErrorPopup" data-backdrop="static" data-keyboard="false">
    <div class="modal-dialog  modal-sm">
        <div class="modal-content">
            <div class="modal-header" data-bind="visible: showHeader" style="text-align: center;">
                <button type="button" id="modalCloseBtn" data-bind="click:CloseErrorPopup" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" data-bind="text:ErrorHeader"></h4>
            </div>
            <div class="modal-body">
              
            <div data-bind="html: ErrorList"></div>
                <input type="button" class="btn btn-primary  btn-block" data-bind="value:CloseBtnTxt, click:CloseErrorPopup" />
            </div>
        </div>
    </div>
</div>`;
class selectObject {
}
class MyInput {
    constructor(id, initVals) {
        this.label = '';
        this.isValid = ko.observable(true);
        this.hide = ko.observable(false);
        this.value = ko.observable('');
        this.validators = [];
        this.errorList = ko.observableArray([]);
        this.disabled = ko.observable(false);
        this.Required = false;
        this.RequiredMessageID = '';
        this.inputType = 1;
        this.selectObjects = ko.observableArray([]);
        this.slcObjWithCost = ko.observableArray([]);
        this.link = '';
        this.currencyToSelect = ko.observableArray([]);
        this.PreventPaste = ko.observable();
        this.ValidateOnFocusOutOnly = ko.observable(false);
        this.PasteAllowed = ko.computed(() => (!this.PreventPaste()), this);
        this.PasteAutoCompl = ko.computed(() => (this.PreventPaste() ? "new-password" : "on"), this);
        this.booleanValue = ko.pureComputed({
            read: () => {
                if (this.value() == 'true')
                    return true;
                return false;
            },
            write: (val) => {
                if (val == true) {
                    this.value('true');
                }
                else {
                    this.value('false');
                }
            }
        });
        this.validate = () => {
            let boo = this.GetIsValid();
            this.isValid(boo);
            if (boo) {
                this.showError(false);
            }
            this.isValid;
            return boo;
        };
        this.GetIsValid = () => {
            this.errorList.removeAll();
            if (this.hide())
                return true;
            switch (this.inputType) {
                case 1:
                    return this.TextboxValidator();
                case 2:
                    return this.DropdownValidator();
                case 3:
                    return this.CheckboxValidator();
                default:
                    throw "unknow imput type";
            }
        };
        this.TextboxValidator = () => {
            let tmpIsValid = true;
            try {
                if (this.Required) {
                    var valueToCheck = (this.value() !== undefined && this.value() !== null) ? this.value().trim() : '';
                    if (valueToCheck == '') {
                        tmpIsValid = false;
                        this.errorList.push(langs.Get(this.RequiredMessageID));
                        this.showError(true);
                    }
                }
                ko.utils.arrayForEach(this.validators, (item) => {
                    if (!item.IsValid(this.value())) {
                        tmpIsValid = false;
                        let tmp = langs.Get(item.messageId);
                        this.errorList.push(tmp);
                        this.showError(true);
                    }
                });
            }
            catch (err) {
                MyLog(err);
                tmpIsValid = true;
            }
            return tmpIsValid;
        };
        this.IsDropDownEmpty = () => {
            if (this.value() == '0' || this.value() == undefined || this.value() == null || this.value() == '') {
                return false;
            }
            return true;
        };
        this.DropdownValidator = () => {
            let tmpIsValid = true;
            try {
                if (this.Required) {
                    if (!this.IsDropDownEmpty()) {
                        tmpIsValid = false;
                        this.errorList.push(langs.Get(this.RequiredMessageID));
                        this.isValid(false);
                        this.showError(true);
                    }
                }
            }
            catch (err) {
                tmpIsValid = true;
                MyLog(err);
            }
            return tmpIsValid;
        };
        this.CheckboxValidator = () => {
            let tmpIsValid = true;
            try {
                if (this.Required) {
                    if (this.value() != "true") {
                        tmpIsValid = false;
                        this.isValid(false);
                        this.showError(true);
                        this.errorList.push(langs.Get(this.RequiredMessageID));
                    }
                }
            }
            catch (err) {
                tmpIsValid = true;
            }
            return tmpIsValid;
        };
        this.paymentSelectoinChenge = (obj, e) => {
            this.value(e.target.selectedIndex);
        };
        this.ErrorListToShowHTML = ko.computed(() => {
            let error = '<ul id="' + this.id + 'ErrorBlock"' + '>';
            for (let i in this.errorList()) {
                error = error + '<li>' + this.errorList()[i] + '</li>';
            }
            error = error + '</ul>';
            return error;
        });
        this.showError = ko.observable(false);
        this.currentTimeOut = null;
        this.CssValid = ko.computed(() => {
            return this.isValid() ? "" : "has-error";
        });
        this.SetInitValues = (initVals) => {
            if (!initVals)
                return;
            for (let key in initVals) {
                if (initVals[key] == null) {
                    continue;
                }
                if (initVals.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                    if (ko.isObservable(this[key])) {
                        this[key](initVals[key]);
                    }
                    else {
                        this[key] = initVals[key];
                    }
                }
            }
            if (initVals.RegExValidators != undefined && initVals.RegExValidators != null) {
                for (let i = 0; i < initVals.RegExValidators.length; i++) {
                    this.validators.push(new Validator(initVals.RegExValidators[i].messageId, initVals.RegExValidators[i].regex));
                }
            }
        };
        this.id = id;
        this.SetInitValues(initVals);
    }
    SetIsValid(val) {
        this.isValid(val);
    }
    SubscribToIsValid(func) {
        this.isValid.subscribe(func);
    }
}
class MyTextBox extends MyInput {
    constructor() {
        super(...arguments);
        this.name = "MyTextBox";
    }
}
class controlerBase {
    constructor() {
        this.lang = langs.lan;
        this.name = 'controlerBase';
        this.Done = (...args) => {
            this.validateAll();
            this.onDoneClick(this, args);
        };
        this.IsValid = () => {
            throw new Error('This method is abstract');
        };
        this.errorsList = new ErrorSummary();
        this.SetMyInputInitValues = (init) => {
            let TempThis = this;
            for (let key in TempThis) {
                if (TempThis.hasOwnProperty(key)) {
                    if (TempThis[key] instanceof MyInput) {
                        let tmp = TempThis[key];
                        if (init.hasOwnProperty(key))
                            tmp.SetInitValues(init[key]);
                    }
                }
            }
        };
        this.sonsContollers = [];
        this.validateAll = () => {
            let TempThis = this;
            let isvalid = true;
            for (let key in TempThis) {
                if (TempThis.hasOwnProperty(key)) {
                    if (TempThis[key] instanceof MyInput) {
                        let tmp = TempThis[key];
                        this.errorsList.remove(tmp.id);
                        if (tmp.validate() == false) {
                            ko.utils.arrayForEach(tmp.errorList(), (item) => {
                                this.errorsList.push(tmp.id, item);
                            });
                            isvalid = false;
                        }
                    }
                }
            }
            for (let i = 0; i < this.sonsContollers.length; i++) {
                if (this.sonsContollers[i].validateAll() == false)
                    isvalid = false;
            }
            return isvalid;
        };
        this.initValidation = () => {
            let tempThis = this;
            for (let key in tempThis) {
                if (tempThis.hasOwnProperty(key)) {
                    if (tempThis[key] instanceof MyInput) {
                        this.RegisterImputField(tempThis[key]);
                    }
                }
            }
        };
    }
    InitController(params) {
        if (!params) {
            throw "controlerBase must have init value";
        }
        if (!params.ControlInit) {
            throw "ControlInit must have init value";
        }
        this.SetMyInputInitValues(params.ControlInit);
        if (params.ModuleRef) {
            params.ModuleRef(this);
        }
        this.initValidation();
    }
    RegisterImputField(tmp) {
        if (!tmp.ValidateOnFocusOutOnly())
            tmp.value.subscribe(tmp.validate);
    }
}
class ErrorSummary {
    constructor() {
        this.messages = ko.observableArray();
        this.push = (id, message) => {
            this.messages.push(new ErrorItem(id, message));
        };
        this.pushError = (error) => {
            ko.utils.arrayForEach(error, (i) => {
                this.messages.push(new ErrorItem(i.id, i.message));
            });
        };
        this.remove = (id) => {
            this.messages.remove((item) => {
                return item.id == id;
            });
        };
        this.removeByFilter = (filter) => {
            this.messages.remove((item) => {
                return item.id.indexOf(filter) == 0;
            });
        };
        this.hasMessages = () => {
            return this.messages().length > 0;
        };
        this.popupMessage = () => {
            var message = "";
            ko.utils.arrayForEach(this.messages(), (item) => {
                message += item.message + '\n';
            });
            return message;
        };
    }
}
class ErrorItem {
    constructor(id, message) {
        this.id = id;
        this.message = message;
    }
}
var Cardcom3DSecureResponseCode;
(function (Cardcom3DSecureResponseCode) {
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["PassOver3DSecureAuth"] = -1] = "PassOver3DSecureAuth";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["Unknown"] = 0] = "Unknown";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["Auth"] = 1] = "Auth";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["FingerPrint"] = 2] = "FingerPrint";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["CardHolderChellenge"] = 3] = "CardHolderChellenge";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["FailAuth"] = 4] = "FailAuth";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["FailError"] = 5] = "FailError";
    Cardcom3DSecureResponseCode[Cardcom3DSecureResponseCode["RejectAuth"] = 6] = "RejectAuth";
})(Cardcom3DSecureResponseCode || (Cardcom3DSecureResponseCode = {}));
class Cardcom3DSecureService {
    constructor() {
        this.fingerPrintProcessed = false;
        this.AfterDeviceFingerPrint = (responseData) => {
            if (this.fingerPrintProcessed)
                return this.DeviceFingerPrintPromise.reject();
            if (this.DeviceFingerPrintTimeoutId) {
                clearTimeout(this.DeviceFingerPrintTimeoutId);
                this.DeviceFingerPrintTimeoutId = null;
            }
            this.fingerPrintProcessed = true;
            let response;
            response = typeof (responseData) === "string" ? JSON.parse(responseData) : responseData;
            return this.DeviceFingerPrintPromise.resolve(response);
        };
        this.AfterCardHolderChallenge = (responseData) => {
            let response;
            response = typeof (responseData) === "string" ? JSON.parse(responseData) : responseData;
            this.CardHolderChallengePromise.resolve(response);
            this.CloseCardHolderChellengeIframe();
        };
        window["AfterDeviceFingerPrint"] = this.AfterDeviceFingerPrint;
        window["AfterCardHolderChallenge"] = this.AfterCardHolderChallenge;
    }
    ShouldDo3DSecure(request) {
        let ajaxCall = $.post("/3DSecure/ShouldDo3DSecure", request);
        return ajaxCall;
    }
    CanDo3DSecure(request) {
        let ajaxCall = $.post("/3DSecure/CanDo3DSecure", request);
        return ajaxCall;
    }
    StartInitialAuth(request) {
        let ajaxCall = $.post("/3DSecure/InitialAuthentication", request);
        return ajaxCall;
    }
    ShouldCanStart(request) {
        let ajaxCall = $.post("/3DSecure/ShouldCanStart3DSecure", request);
        return ajaxCall;
    }
    StartDeviceFingerPrint(response) {
        this.CreateFingerPrintIframe(response);
        this.DeviceFingerPrintTimeoutId = setTimeout(() => {
            if (this.fingerPrintProcessed)
                return this.DeviceFingerPrintPromise.reject();
            this.FailDeviceFingerPrintAPI(response).done((res) => {
                if (this.fingerPrintProcessed)
                    return this.DeviceFingerPrintPromise.reject();
                if (this.DeviceFingerPrintTimeoutId) {
                    clearTimeout(this.DeviceFingerPrintTimeoutId);
                    this.DeviceFingerPrintTimeoutId = null;
                }
                this.fingerPrintProcessed = true;
                let response;
                if (!res)
                    return this.DeviceFingerPrintPromise.reject();
                response = typeof (res) === "string" ? JSON.parse(res) : res;
                if (response.ResponseCode == 2) {
                    return this.DeviceFingerPrintPromise.reject();
                }
                return this.DeviceFingerPrintPromise.resolve(response);
            });
        }, 20 * 1000);
        return this.DeviceFingerPrintPromise;
    }
    CreateFingerPrintIframe(response) {
        this.DeviceFingerPrintPromise = $.Deferred();
        this.fingerPrintProcessed = false;
        let fingerPrintIframe = document.createElement('iframe');
        fingerPrintIframe.hidden = true;
        window.document.body.appendChild(fingerPrintIframe);
        let form = document.createElement('form');
        form.action = response._3ds_method;
        form.method = "post";
        form.id = "3dSecureFingerPrintForm";
        let input = document.createElement('input');
        input.value = response.threeDSMethodData;
        input.name = "threeDSMethodData";
        form.appendChild(input);
        fingerPrintIframe.contentDocument.body.appendChild(form);
        form.submit();
    }
    FailDeviceFingerPrintAPI(response) {
        if (this.fingerPrintProcessed)
            return this.DeviceFingerPrintPromise.reject();
        ;
        let queryString = response._3ds_trxid;
        let ajaxSettings = {
            type: "POST",
            dataType: "json",
            url: "/3DSecure/DeviceFingerPrintFailAterTimeOut?threeDSServerTransID=" + queryString,
        };
        return $.ajax(ajaxSettings);
    }
    SaveDealForInternalCharge(_3dsTran, dealToSave) {
        const dealJSON = JSON.stringify(dealToSave);
        let ajaxCall = $.ajax({
            data: { "": dealJSON },
            type: "POST",
            url: "/3DSecure/SaveDealForInternalCharge?tranId=" + _3dsTran,
        });
        return ajaxCall;
    }
    StartCardholderChallenge(response) {
        this.CardHolderChallengePromise = $.Deferred();
        if (response._3ds_version.match("^1\.")) {
            window.location.href = response._3ds_acsurl;
            return;
        }
        else {
            this.cardHolderChellengeIframe = document.createElement('iframe');
            this.cardHolderChellengeIframe.src = response._3ds_acsurl;
            this.cardHolderChellengeIframe.id = "3ds-cardholder-challenge";
            this.cardHolderChellengeIframe.style.zIndex = "9999";
            this.cardHolderChellengeIframe.height = "95%";
            this.cardHolderChellengeIframe.width = "95%";
            this.cardHolderChellengeIframe.style.backgroundColor = "white";
            this.cardHolderChellengeIframe.style.position = "fixed";
            this.cardHolderChellengeIframe.style.left = "50%";
            this.cardHolderChellengeIframe.style.top = "50%";
            this.cardHolderChellengeIframe.style.transform = "translate(-50%, -50%)";
            window.document.body.appendChild(this.cardHolderChellengeIframe);
        }
        return this.CardHolderChallengePromise;
    }
    CloseCardHolderChellengeIframe() {
        if (this.cardHolderChellengeIframe) {
            this.cardHolderChellengeIframe.style.zIndex = "-1";
            this.cardHolderChellengeIframe.remove();
        }
        if (this.cardHolderChellengeTab)
            this.cardHolderChellengeTab.close();
    }
}
class CreditCardPayment extends controlerBase {
    constructor(params) {
        super();
        this.params = params;
        this.name = 'CreditCardPayment';
        this.email = new MyInput("CreditCardPaymentEmail");
        this.phone = new MyInput("PhoneNumber");
        this.phonelabel = ko.pureComputed(() => {
            if (this.phone.Required)
                return this.lang.ilblMobilPhone + '*';
            return this.lang.ilblMobilPhone;
        });
        this.cardNumber = new MyInput("CreditCardPaymentCardNumber");
        this.date = new MyInput("CreditCardValidDate");
        this.year = new MyInput("CreditCardValidYear");
        this.month = new MyInput("CreditCardValidMonth");
        this.cvv = new MyInput("CreditCardPaymentCvv");
        this.cardUserId = new MyInput("CreditCardPaymentcardUserId");
        this.cardOwnerName = new MyInput("CardOwnerName");
        this.dateValue = ko.observable();
        this.ErrorCssClass = ko.observable();
        this.DealInfoModalVisible = ko.observable(false);
        this.isToShowItemDetails = ko.observable(false);
        this.dealInfoRef = ko.observable();
        this.HideCardOnZero = ko.observable(false);
        this.CartTotal = ko.observable(0);
        this.CreditcardComments = ko.observable('');
        this.CommentVisible = ko.observable(false);
        this.CardOwnerIdTxt = ko.observable('');
        this.PayPal = () => {
            this.OpenPayPal();
        };
        this.OpenPayPal = () => {
        };
        this.OpenUseTermModal = (link, termHeader) => {
        };
        this.isErrorPopupVisible = ko.observable(false);
        this.isDateValid = (value) => {
            try {
                let date = value.split('/');
                let month = Number(date[0]);
                let year = Number(date[1]);
                let nowYear = new Date().getFullYear();
                let nowYearStr = Number(nowYear.toString().substring(2));
                if (year < nowYearStr) {
                    return false;
                }
                if (date[0] == 'undefined' || month > 12 || month < 1) {
                    return false;
                }
            }
            catch (error) {
                return false;
            }
            return true;
        };
        this.IsValid = () => {
            return this.validateAll();
        };
        this.SetDealInfoToInformationRef = (ModuelReg) => {
            this.dealInfoRef(ModuelReg);
            this.sonsContollers.push(ModuelReg);
        };
        this.IsHideCardOnZero = ko.pureComputed(() => {
            if (this.isToShowItemDetails()) {
                if (this.dealInfoRef()) {
                    if (this.dealInfoRef().sum() == 0 && this.HideCardOnZero() == true) {
                        return true;
                    }
                }
            }
            else {
                return (this.CartTotal() == 0 && this.HideCardOnZero() == true);
            }
            return false;
        });
        this.GetAllValues = () => {
            let values = {
                email: this.email.value(),
                phone: this.phone.value(),
                cardNumber: this.cardNumber.value(),
                date: this.date.value(),
                year: this.year.value(),
                month: this.month.value(),
                cvv: this.cvv.value(),
                cardOwnerName: this.cardOwnerName.value(),
                cardUserId: this.cardUserId.value(),
            };
            return values;
        };
        this.GetDealInfo = () => {
            let oneItemDeal = null;
            if (this.isToShowItemDetails() == true) {
                oneItemDeal = this.dealInfoRef().GetAllValues();
            }
            return oneItemDeal;
        };
        this.GetDelivery = () => {
            let delivery = null;
            if (this.isToShowItemDetails() == true) {
                delivery = this.dealInfoRef().Getdelivery();
            }
            return delivery;
        };
        this.inputMailhasFocus = ko.observable(false);
        this.inputMailDirection = ko.pureComputed(() => {
            if (this.inputMailhasFocus()) {
                return 'ltr';
            }
            else {
                return '';
            }
        });
        this.inputCChasFocus = ko.observable(false);
        this.inputCCDirection = ko.pureComputed(() => {
            if (this.inputCChasFocus()) {
                return 'ltr';
            }
            else {
                return '';
            }
        });
        this.tmpMail = '';
        this.SendDataToServerOnEmailLostFocus = () => {
            if (this.email.value() != '' && this.email.value() != this.tmpMail) {
                this.tmpMail = this.email.value();
                this.SendDataToServer();
            }
        };
        this.SendDataToServer = () => { };
        this.CheckPrefix = () => {
            this.Parent().ProcessKupon();
        };
        this.Parent = ko.observable();
        this.SetParent = (parent) => {
            this.Parent(parent);
        };
        this.cancelMouseWheel = (d, e) => {
            return false;
        };
        this.showDateError = ko.pureComputed(() => {
            if (this.year.isValid() && this.month.isValid()) {
                this.DateCssValid("");
                return false;
            }
            this.datesErrorsToShow(this.year.ErrorListToShowHTML() + this.month.ErrorListToShowHTML());
            this.DateCssValid("has-error");
            return true;
        });
        this.datesErrorsToShow = ko.observable();
        this.DateCssValid = ko.observable();
        this.dateValidation = {
            showError: this.showDateError,
            ErrorListToShowHTML: this.datesErrorsToShow,
            CssValid: this.DateCssValid
        };
        this.InitController(params);
        this.CreditcardComments(params.ControlInit['CreditcardComments'] ? params.ControlInit['CreditcardComments'] : '');
        this.CommentVisible(this.CreditcardComments() != '' ? true : false);
        this.dealInfo = params.InnerModal['modal'];
        this.HideCardOnZero(params.InnerModal['HideCardOnZero'] != undefined ? params.InnerModal['HideCardOnZero'] : false);
        if (params.InnerModal['visible']() == false) {
            this.isToShowItemDetails(true);
        }
        this.OpenUseTermModal = params.OpenUseTermModal;
        this.SendDataToServer = params.SendDataToServer;
        this.date.validators.push(new CustomValidator('ilblValidDateReq', this.isDateValid));
        this.cardUserId.validators.push(new IdValidator('ilblIdValidator'));
        this.email.label = this.lang.ilblEmail;
        if (this.email.Required) {
            this.email.label += '*';
        }
        this.CardOwnerIdTxt(this.lang.ilblCardOwnerID);
        if (!this.cardUserId.Required)
            this.CardOwnerIdTxt(this.lang.ilblCardOwnerIDNotRequired);
    }
}
CreditCardPayment.CreditCardPaymentForPopUP2 = `<form class="form-horizontal creditcard-form">
    <!-- Deal single item Info -->
    <div class="single-item-wrap" data-bind="if:isToShowItemDetails">
        <div class="single-item-component-wrap" data-bind='component:{name: "deal-info",params:{ControlInit: dealInfo , ModuleRef:SetDealInfoToInformationRef,singleItemChoosed:true } },'>
        </div>
        <hr />
    </div>
    <div class="creditcard-fields-wrap" data-bind="hide:IsHideCardOnZero">
        <div class="creditcard-comments-wrap" data-bind="if:CommentVisible">
            <div class="alert alert-info creditcard-comments" role="alert" data-bind="text:CreditcardComments" style="margin-bottom:5px;padding:10px"></div>
        </div>

<!-- NEW CardOwnerName -->
        <div class="form-group card-owner-name-wrap" data-bind="hide:cardOwnerName.hide, css:cardOwnerName.CssValid">
                <label class="col-md-4 custom-label col-xs-12"
                    data-bind="text: lang.lblCardownerName,attr:{'for':cardOwnerName.id} "></label>
                <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:cardOwnerName.CssValid">
                    <input type="text" class="form-control custom-input" data-bind="textInput:cardOwnerName.value, attr: {id:cardOwnerName.id,'aria-invalid': !cardOwnerName.isValid(),'aria-describedby':cardOwnerName.id+'ErrorBlock'}">
                </div>
                <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:cardOwnerName.ErrorListToShowHTML,visible: cardOwnerName.showError, attr:{id:cardOwnerName.id+'ErrorBlock'}">
                </div>
            </div>

<!-- NEW Mail -->
        <div class="form-group credit-email-wrap" data-bind="hide:email.hide, css:email.CssValid">
                <label class="col-md-4 custom-label col-xs-12"
                       data-bind="text: email.label, attr:{'for':email.id} "></label>
                <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:email.CssValid">
                    <input type="text" class="form-control custom-input" data-bind="value:email.value,
                        attr: { id:email.id,'aria-invalid': !email.isValid(),'aria-describedby':email.id+'ErrorBlock'},
                        event : { blur:SendDataToServerOnEmailLostFocus},
">
                </div>
               <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:email.ErrorListToShowHTML,
                visible: email.showError, 
                attr:{id:email.id+'ErrorBlock'},
">
               </div>
            </div>


<!-- New Phone -->
            <div class="form-group credit-phone-wrap" data-bind="hide:phone.hide, css:phone.CssValid">
                <label class="col-md-4 custom-label col-xs-12" data-bind="text: phonelabel, attr:{'for':phone.id} "></label>
                <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:phone.CssValid">
                    <input type="text" class="form-control custom-input" data-bind="textInput:phone.value,attr: { id:phone.id,'aria-invalid': !phone.isValid(), 'aria-describedby':phone.id+'ErrorBlock'}">
                </div>
               <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:phone.ErrorListToShowHTML,visible: phone.showError, attr:{id:phone.id+'ErrorBlock'}">
			   </div>
            </div>

<!-- NEW Credit card -->
            <div class="form-group creditcard-number-wrap" data-bind="hide:cardNumber.hide, css:cardNumber.CssValid">
                <label class="col-md-4 custom-label col-xs-12" data-bind="text: lang.ilblCardNumber, attr:{'for':cardNumber.id} "></label>
                <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:cardNumber.CssValid">
                    <input type="text" class="form-control custom-input" data-bind="value:cardNumber.value, attr: { id:cardNumber.id, 'aria-invalid': !cardNumber.isValid(),'aria-describedby':cardNumber.id+'ErrorBlock'}">
                </div>
               <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:cardNumber.ErrorListToShowHTML,visible: cardNumber.showError, attr:{id:cardNumber.id+'ErrorBlock'}">
                </div>
            </div>

 <!--New DATE -->
            <div class="form-group expiration-date-wrap" data-bind="hide:year.hide, css:dateValidation.CssValid">
                <label for="itempayforselection" 
                        class="col-md-4 col-xs-12 custom-label"
                       data-bind="text: lang.ilblValidDate"></label>
                <div class="col-md-4 col-xs-6">
                    <select id="itempayforselection" class="form-control custom-input"
                            data-bind="options: year.selectObjects,event: { mousewheel: cancelMouseWheel } ,
                                        value: year.value,
                                        optionsText: 'text',
                                        optionsValue: 'key',
										attr:{
											'aria-invalid': !year.isValid(),
                                            'aria-describedby':year.id+'ErrorBlock',
                                            'aria-required': year.Required}">
                    </select>
                </div>               
                <div class="col-md-4 col-xs-6">
                    <select id="itempayforselection2" class="form-control custom-input"
                            data-bind="options: month.selectObjects,event: { mousewheel: cancelMouseWheel } ,
                                        value: month.value,
                                        optionsText: 'text',
                                        optionsValue: 'key',
										attr:{
											'aria-invalid': !month.isValid(),
                                            'aria-describedby':month.id+'ErrorBlock',
                                            'aria-required': month.Required}">
                    </select>
                </div>
                <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:dateValidation.ErrorListToShowHTML,
                 visible: dateValidation.showError, attr:{id:year.id+'ErrorBlock'+' '+month.id+'ErrorBlock'}"></div>
            </div>
       

 <!-- New CVV -->
            <div class="form-group card-cvv-wrap" data-bind="hide:cvv.hide, css:cvv.CssValid">
                <label class="col-md-4 col-xs-12 custom-label"
                       data-bind="text: lang.ilblCVV, attr:{'for':cvv.id} "></label>
                <div class="col-md-8 col-xs-12 padding-left-right-15" data-bind="css:cvv.CssValid">
                    <input type="text" class="form-control custom-input" autocomplete="off"
                           data-bind="value:cvv.value,
                                           attr: { id:cvv.id, 
                                                'aria-invalid': !cvv.isValid(),
                                                'aria-describedby':cvv.id+'ErrorBlock',
                                                'aria-required': cvv.Required}">
                </div>
               <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:cvv.ErrorListToShowHTML,
                 visible: cvv.showError, attr:{id:cvv.id+'ErrorBlock'}">
                </div>
            </div>
       
<!-- New ID -->
        <div class="form-group owner-id-wrap" data-bind="hide:cardUserId.hide, css:cardUserId.CssValid">
                <label class="col-md-4 col-xs-12 custom-label"
                       data-bind="text: CardOwnerIdTxt, attr:{'for':cardUserId.id} "></label>
                <div class="col-md-8  col-xs-12 padding-left-right-15" data-bind="css:cardUserId.CssValid">
                    <input type="text" class="form-control custom-input"
                           data-bind="value:cardUserId.value,
                                           attr: { id:cardUserId.id, 
                                                'aria-invalid': !cardUserId.isValid(),
                                                'aria-describedby':cardUserId.id+'ErrorBlock',
                                                'aria-required': cardUserId.Required},
                                          ">
                </div>
               <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:cardUserId.ErrorListToShowHTML,
                 visible: cardUserId.showError, attr:{id:cardUserId.id+'ErrorBlock'}"></div>
            </div>

     </div>

</form>`;
class CustomFields extends controlerBase {
    constructor(params) {
        super();
        this.params = params;
        this.name = 'CustomFields';
        this.customFields = new Array();
        this.CommentVisible = ko.observable(false);
        this.CustomFieldsComments = ko.observable('');
        this.InitCustomFields = (from, to) => {
            to.hide(from.hide);
            to.value(from.value);
            to.SetIsValid(true);
            to.optionsCaption = from.optionsCaption;
            to.custId = from.custId;
            to.inputType = from.type;
            to.selectObjects = from.selectObjects;
            to.Required = from.Required;
            to.label = from.label;
            if (to.Required) {
                to.label += '*';
            }
            to.RequiredMessageID = from.RequiredMessageID;
            if (from.RegExValidators != undefined && from.RegExValidators != null) {
                for (let i = 0; i < from.RegExValidators.length; i++) {
                    to.validators.push(new Validator(from.RegExValidators[i].messageId, from.RegExValidators[i].regex));
                }
            }
        };
        this.fieldType = (c) => {
            return c.inputType == 1 ? "customFieldText" : "customFieldSelect";
        };
        this.GetAllValues = () => {
            let custf = new Array();
            for (let i = 0; i < this.customFields.length; i++) {
                custf.push({
                    custId: this.customFields[i].custId,
                    value: this.customFields[i].value(),
                    type: this.customFields[i].inputType
                });
            }
            return custf;
        };
        this.IsValid = () => {
            let v = true;
            ko.utils.arrayForEach(this.customFields, (i) => {
                if (!i.validate()) {
                    v = false;
                }
            });
            return v;
        };
        this.InitController(params);
        this.CustomFieldsComments(params.ControlInit['CustomFieldsComments'] ? params.ControlInit['CustomFieldsComments'] : '');
        this.CommentVisible(this.CustomFieldsComments() != '' ? true : false);
        if (params.ControlInit['customFields'].length > 0) {
            for (var i = 0; i < params.ControlInit['customFields'].length; i++) {
                var customField = new CustomFieldInfo("custom" + params.ControlInit['customFields'][i].custId);
                this.InitCustomFields(params.ControlInit['customFields'][i], customField);
                this.customFields.push(customField);
                this.RegisterImputField(customField);
            }
        }
    }
}
CustomFields.MyHTML = `<form class="form-horizontal">
    <div class="customFields-comments-wrap" data-bind="if:CommentVisible">
        <div class="alert alert-info customFields-comments" role="alert" data-bind="text:CustomFieldsComments" style="margin-bottom:5px;padding:10px"></div>
    </div>
    <!-- ko template: { name:fieldType , foreach: customFields}  -->
    <!-- /ko -->
    <script type="text/html" id="customFieldText">
        <div class="form-group custom-field-text" data-bind="hide: hide, css:CssValid">
            <label class="col-md-4" data-bind="text: label,
                   attr:{'for':id}">
            </label>
            <div class="col-md-8 custom-field-input-wrap">
                <input type="text" maxlength="50" class="form-control custom-input" data-bind="value:value,
                                   attr: {id:id , 'aria-invalid': isValid() , 'aria-describedby':id+'ErrorBlock'},
                                  ">
            </div>
            <div class="alert alert-danger no-top-bottom-padding col-md-12" role="alert" data-bind="html:ErrorListToShowHTML,
                 visible: showError,
                 attr: {id:id+'ErrorBlock'}"></div>
        </div>


    </script>
    <script type="text/html" id="customFieldSelect">
        <div class="form-group custom-field-select">
            <label for="itempayforselection" class="col-md-4 custom-label"
                   data-bind="text: label, hide:hide, css:CssValid,  attr: {for:id} ,"></label>
            <div class="col-md-8 custom-field-select-wrap">
                <select id="itempayforselection" class="form-control custom-input"
                        data-bind="options: selectObjects,value: value,
                                    optionsText: 'text',
                                    optionsValue: 'key',
                        attr: {id:id , 'aria-invalid': isValid() , 'aria-describedby':id+'ErrorBlock'},
                        "></select>
            </div>
            <div class="alert alert-danger no-top-bottom-padding col-md-12" role="alert" data-bind="html:ErrorListToShowHTML,
                 visible: showError,
                 attr: {id:id+'ErrorBlock'}"></div>
        </div>

    </script>
</form>`;
class CustomFieldInfo extends MyInput {
    constructor() {
        super(...arguments);
        this.custId = 0;
    }
}
class InvoiceToInformation extends controlerBase {
    constructor(params) {
        super();
        this.params = params;
        this.name = 'InvoiceToInformation';
        this.compID = new MyInput("InvoiceToInformationCompID");
        this.AddresLine1 = new MyInput("InvoiceToInformationAddresLine1");
        this.AddresLine2 = new MyInput("InvoiceToInformationAddresLine2");
        this.City = new MyInput("InvoiceToInformationCity");
        this.LinePH = new MyInput("InvoiceToInformationLinePH");
        this.MobilePH = new MyInput("InvoiceToInformationMobilePH");
        this.Name = new MyInput("InvoiceToInformationName");
        this.InvoiceEmail = new MyInput("InvoiceToInformationEmail");
        this.InvoiceEmailVerify = new MyInput("InvoiceToInformationEmailVerify");
        this.InvoiceComments = ko.observable('');
        this.CommentVisible = ko.observable(false);
        this.IsValid = () => {
            return this.validateAll();
        };
        this.GetAllValues = () => {
            let values = {
                compID: this.compID.value(),
                AddresLine1: this.AddresLine1.value(),
                AddresLine2: this.AddresLine2.value(),
                City: this.City.value(),
                LinePH: this.LinePH.value(),
                MobilePH: this.MobilePH.value(),
                Name: this.Name.value(),
                InvoiceEmail: this.InvoiceEmail.value(),
                InvoiceEmailVerify: this.InvoiceEmailVerify.value(),
            };
            return values;
        };
        this.ltrinputhasFocus1 = ko.observable(false);
        this.ltrinputhasFocus2 = ko.observable(false);
        this.inputDirection = ko.pureComputed(() => {
            if (this.ltrinputhasFocus1() || this.ltrinputhasFocus2()) {
                return 'ltr';
            }
            else {
                return '';
            }
        });
        this.tmpMail = '';
        this.tmpMobile = '';
        this.tmpName = '';
        this.emailVerifyCheck = (emailConf) => {
            return emailConf.toLowerCase().trim() == this.InvoiceEmail.value().toLowerCase().trim();
        };
        this.EmailFocusOut = () => {
            if (this.InvoiceEmail.ValidateOnFocusOutOnly())
                this.InvoiceEmail.validate();
        };
        this.EmailVerifyFocusOut = () => {
            if (this.InvoiceEmailVerify.ValidateOnFocusOutOnly())
                this.InvoiceEmailVerify.validate();
        };
        this.MobilePhoneFocusOut = () => {
            if (this.MobilePH.ValidateOnFocusOutOnly())
                this.MobilePH.validate();
        };
        this.SendDataToServerOnEmailLostFocus = () => {
            if (this.InvoiceEmail.value() == '') {
                return;
            }
            if (this.InvoiceEmail.value() != this.tmpMail ||
                this.MobilePH.value() != this.tmpMobile ||
                this.Name.value() != this.tmpName) {
                this.tmpMail = this.InvoiceEmail.value();
                this.tmpMobile = this.MobilePH.value();
                this.tmpName = this.Name.value();
                this.SendDataToServer();
            }
        };
        this.SendDataToServer = () => { };
        this.GetText = (Required, text) => {
            if (Required)
                return text + ' *';
            return text;
        };
        this.InitController(params);
        this.InvoiceComments(params.ControlInit['InvoiceComments'] ? params.ControlInit['InvoiceComments'] : '');
        this.CommentVisible(this.InvoiceComments() != '' ? true : false);
        this.SendDataToServer = params.SendDataToServer;
        this.compID.validators.push(new IdValidator('ilblInvoiceID'));
        this.InvoiceEmailVerify.validators.push(new CustomValidator('ilblEmailVerifyValidator', this.emailVerifyCheck));
    }
}
InvoiceToInformation.MyHtml = `
<form class="form-horizontal invoice-form">
    <div class="invoice-comments-wrap" data-bind="if:CommentVisible">
        <div class="alert alert-info invoice-comments" role="alert" data-bind="text:InvoiceComments" style="margin-bottom:5px;padding:10px"></div>
    </div>

    <!-- Mail Orig 
    <div class="row margin-bottom-row invoice-mail-wrap" data-bind="hide:InvoiceEmail.hide">
        <div class="input-group" data-bind="css:InvoiceEmail.CssValid">
            <span class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
            <input dir="ltr" type="email" class="form-control custom-input" data-bind="value:InvoiceEmail.value,
                                    customPlaceholder: {required:InvoiceEmail.Required, placeholder:lang.ilblEmail},
                                    attr: { id:InvoiceEmail.id ,
                                   'aria-invalid': !InvoiceEmail.isValid(),
                                   'aria-describedby':InvoiceEmail.id+'ErrorBlock',
                                   'aria-required': InvoiceEmail.Required,
                                    'dir':inputDirection},
                                   event : { blur:SendDataToServerOnEmailLostFocus},
                                   hasFocus:ltrinputhasFocus1">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:InvoiceEmail.ErrorListToShowHTML,
                 visible: InvoiceEmail.showError,attr:{id:InvoiceEmail.id+'ErrorBlock'}"></div>
    </div>
-->

    <!-- Mail confirmation OLD
    <div class="row margin-bottom-row invoice-mailconf-wrap" data-bind="hide:InvoiceEmailVerify.hide">
        <div class="input-group" data-bind="css:InvoiceEmailVerify.CssValid">
            <span class="input-group-addon"><i class="fa fa-check" aria-hidden="true"></i></span>
            <input dir="ltr" type="email" class="form-control custom-input" data-bind="value:InvoiceEmailVerify.value,
                                    customPlaceholder: {required:InvoiceEmailVerify.Required, placeholder:lang.ilblEmailVerify},
                                    attr: { id:InvoiceEmailVerify.id,
                                       'aria-invalid': !InvoiceEmailVerify.isValid(),
                                       'aria-describedby':InvoiceEmailVerify.id+'ErrorBlock',
                                       'aria-required': InvoiceEmailVerify.Required,
                                       'autocomplete': InvoiceEmailVerify.PasteAutoCompl,
                                       'dir':inputDirection
                                    },
                                   event : { blur:SendDataToServerOnEmailLostFocus ,
                                             paste: () => { InvoiceEmailVerify.SetIsValid(false); return InvoiceEmailVerify.PasteAllowed(); },
                                             drop: () => { InvoiceEmailVerify.SetIsValid(false); return InvoiceEmailVerify.PasteAllowed(); } ,
                                           },
                                   
                                   hasFocus:ltrinputhasFocus2">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:InvoiceEmailVerify.ErrorListToShowHTML,
                 visible: InvoiceEmailVerify.showError,attr:{id:InvoiceEmailVerify.id+'ErrorBlock'}"></div>
    </div>
 -->

    <!-- Name OLD 
    <div class="row margin-bottom-row test invoice-name-wrap" data-bind="hide:Name.hide">
        <div class="input-group" data-bind="css:Name.CssValid">
            <span class="input-group-addon"><i class="fa fa-user" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="textInput:Name.value,
                                   event : { },
                                   customPlaceholder: {required:Name.Required, placeholder:lang.lblInvCompanyName},
                                   attr: {
                                        id:Name.id ,
                                        'aria-invalid': !Name.isValid() ,
                                        'aria-describedby':Name.id+'ErrorBlock',
                                        'aria-required': Name.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alertdialog" data-bind="html:Name.ErrorListToShowHTML,
                 visible: Name.showError ,attr:{id:Name.id+'ErrorBlock'}"></div>
    </div>
-->

   <!-- CompanyID OLD 
    <div class="row margin-bottom-row invoice-companyid-wrap" data-bind="hide:compID.hide">
        <div class="input-group" data-bind="hide:compID.hide, css:compID.CssValid">
            <span class="input-group-addon"><i class="fa fa-file-text-o" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="value:compID.value,
                                    customPlaceholder: {required:compID.Required, placeholder:lang.ilblInvCompanyNumber},
                                   attr: {
                                         id:compID.id ,
                                         'aria-invalid': !compID.isValid() ,
                                         'aria-describedby':compID.id+'ErrorBlock',
                                         'aria-required': compID.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" aria-atomic="true" data-bind="html:compID.ErrorListToShowHTML,
             visible: compID.showError,attr:{id:compID.id+'ErrorBlock'}"></div>
    </div>
-->


    <!-- Address OLD
    <div class="row margin-bottom-row invoice-address-wrap" data-bind="hide:AddresLine1.hide">
        <div class="input-group" data-bind="hide:AddresLine1.hide, css:AddresLine1.CssValid">
            <span class="input-group-addon"><i class="fa fa-map-marker" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="textInput:AddresLine1.value,
                   customPlaceholder: {required:AddresLine1.Required, placeholder:lang.lblInvAddress1},
                                   attr: {
                                         id:AddresLine1.id ,
                                         'aria-invalid': !AddresLine1.isValid() ,
                                         'aria-describedby':AddresLine1.id+'ErrorBlock',
                                         'aria-required': AddresLine1.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:AddresLine1.ErrorListToShowHTML,
                 visible: AddresLine1.showError,attr:{id:AddresLine1.id+'ErrorBlock'}"></div>
    </div>
 -->

    <!-- state OLD 
    <div class="row margin-bottom-row invoice-state-wrap" data-bind="hide:AddresLine2.hide">
        <div class="input-group" data-bind="hide:AddresLine2.hide, css:AddresLine2.CssValid">
            <span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="textInput:AddresLine2.value,
                   customPlaceholder: {required:AddresLine2.Required, placeholder:lang.lblInvAddress2},
                                   attr: {
                                        id:AddresLine2.id ,
                                        'aria-invalid': !AddresLine2.isValid() ,
                                        'aria-describedby':AddresLine2.id+'ErrorBlock',
                                        'aria-required': AddresLine2.Required},
                                   ">
        </div>
        <div class="alert alert-dange no-top-bottom-paddingr" role="alert" data-bind="html:AddresLine2.ErrorListToShowHTML,
                 visible: AddresLine2.showError,attr:{id:AddresLine2.id+'ErrorBlock'}"></div>
    </div>
-->
    <!-- City OLD
    <div class="row margin-bottom-row invoice-city-wrap" data-bind="hide:City.hide">
        <div class="input-group" data-bind="hide:City.hide, css:City.CssValid">
            <span class="input-group-addon"><i class="fa fa-building" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="textInput:City.value,
                    customPlaceholder: {required:City.Required, placeholder:lang.lblInvCity},
                                   attr: {
                                        id:City.id,
                                        'aria-invalid': !City.isValid(),
                                        'aria-describedby':City.id+'ErrorBlock',
                                        'aria-required': City.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:City.ErrorListToShowHTML,
                 visible: City.showError,attr:{id:City.id+'ErrorBlock'}"></div>
    </div>
 -->

    <!-- Mobile OLD 
    <div class="row margin-bottom-row invoice-mobile-wrap" data-bind="hide:MobilePH.hide">
        <div class="input-group" data-bind="hide:MobilePH.hide, css:MobilePH.CssValid">
            <span class="input-group-addon"><i class="fa fa-mobile" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="textInput:MobilePH.value,
                   event : { },
                   customPlaceholder: {required:MobilePH.Required, placeholder:lang.ilblMobilPhone},
                                   attr: {
                                        id:MobilePH.id,
                                        'aria-invalid': !MobilePH.isValid(),
                                        'aria-describedby':MobilePH.id+'ErrorBlock',
                                        'aria-required': MobilePH.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:MobilePH.ErrorListToShowHTML,
                 visible: MobilePH.showError,attr:{id:MobilePH.id+'ErrorBlock'}"></div>
    </div>
-->

    <!-- LinePhone OLD 
    <div class="row margin-bottom-row invoice-linephone-wrap" data-bind="hide:LinePH.hide">
        <div class="input-group" data-bind="hide:LinePH.hide, css:LinePH.CssValid">
            <span class="input-group-addon"><i class="fa fa-phone" aria-hidden="true"></i></span>
            <input type="text" class="form-control custom-input" data-bind="textInput:LinePH.value,
                   customPlaceholder: {required:LinePH.Required, placeholder:lang.ilblLinePhone},
                                   attr: {placeholder: lang.ilblLinePhone,
                                        id:LinePH.id,
                                        'aria-invalid': !LinePH.isValid(),
                                        'aria-describedby':LinePH.id+'ErrorBlock',
                                        'aria-required': LinePH.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:LinePH.ErrorListToShowHTML,
                 visible: LinePH.showError,attr:{id:LinePH.id+'ErrorBlock'}""></div>
    </div>
 -->
  <!-- Mail New -->


    <div class="form-group invoice-mail-wrap" data-bind="hide:InvoiceEmail.hide">
        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(InvoiceEmail.Required, lang.ilblEmail),attr:{'for':InvoiceEmail.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:InvoiceEmail.CssValid">
            <input dir="ltr" type="email" class="form-control custom-input" data-bind="textInput:InvoiceEmail.value,
                                    attr: { id:InvoiceEmail.id ,
                                   'aria-invalid': !InvoiceEmail.isValid(),
                                   'aria-describedby':InvoiceEmail.id+'ErrorBlock',
                                   'aria-required': InvoiceEmail.Required,
                                    'dir':inputDirection},
                                   event : { blur:SendDataToServerOnEmailLostFocus,focusout:EmailFocusOut},
                                   hasFocus:ltrinputhasFocus1">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:InvoiceEmail.ErrorListToShowHTML,
                 visible: InvoiceEmail.showError,attr:{id:InvoiceEmail.id+'ErrorBlock'}"></div>
    </div>
    
  <!-- Mail confirmation New -->
    <div class="form-group invoice-mailconf-wrap" data-bind="hide:InvoiceEmailVerify.hide">
        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(InvoiceEmailVerify.Required, lang.ilblEmailVerify),attr:{'for':InvoiceEmailVerify.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:InvoiceEmailVerify.CssValid">
            <input dir="ltr" type="email" class="form-control custom-input" data-bind="value:InvoiceEmailVerify.value,
                                    
                                    attr: { id:InvoiceEmailVerify.id,
                                       'aria-invalid': !InvoiceEmailVerify.isValid(),
                                       'aria-describedby':InvoiceEmailVerify.id+'ErrorBlock',
                                       'aria-required': InvoiceEmailVerify.Required,
                                       'autocomplete': InvoiceEmailVerify.PasteAutoCompl,
                                       'dir':inputDirection
                                    },
                                   event : { blur:SendDataToServerOnEmailLostFocus ,focusout:EmailVerifyFocusOut,
                                             paste: () => { InvoiceEmailVerify.SetIsValid(false); return InvoiceEmailVerify.PasteAllowed(); },
                                             drop: () => { InvoiceEmailVerify.SetIsValid(false); return InvoiceEmailVerify.PasteAllowed(); } ,
                                           },
                                   
                                   hasFocus:ltrinputhasFocus2">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:InvoiceEmailVerify.ErrorListToShowHTML,
                 visible: InvoiceEmailVerify.showError,attr:{id:InvoiceEmailVerify.id+'ErrorBlock'}"></div>
    </div>




    <!-- Name New -->

    <div class="form-group margin-bottom-row invoice-name-wrap" data-bind="hide:Name.hide">
         <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(Name.Required, lang.lblInvCompanyName),attr:{'for':Name.id} "></label>

        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="css:Name.CssValid">
            
            <input type="text" class="form-control custom-input" data-bind="textInput:Name.value,
                                   event : { },
                                   attr: {
                                        id:Name.id ,
                                        'aria-invalid': !Name.isValid() ,
                                        'aria-describedby':Name.id+'ErrorBlock',
                                        'aria-required': Name.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alertdialog" data-bind="html:Name.ErrorListToShowHTML, visible: Name.showError ,attr:{id:Name.id+'ErrorBlock'}"></div>
    </div>

 


    <!-- CompanyID NEW  -->
    <div class="form-group invoice-companyid-wrap" data-bind="hide:compID.hide">

        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(compID.Required, lang.ilblInvCompanyNumber),attr:{'for':compID.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="hide:compID.hide, css:compID.CssValid">
            
            <input type="text" class="form-control custom-input" data-bind="value:compID.value,
                                    
                                   attr: {
                                         id:compID.id ,
                                         'aria-invalid': !compID.isValid() ,
                                         'aria-describedby':compID.id+'ErrorBlock',
                                         'aria-required': compID.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" aria-atomic="true" data-bind="html:compID.ErrorListToShowHTML,
             visible: compID.showError,attr:{id:compID.id+'ErrorBlock'}"></div>
    </div>

    <!-- Address NEW -->
    <div class="form-group invoice-address-wrap" data-bind="hide:AddresLine1.hide">
        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(AddresLine1.Required, lang.lblInvAddress1),attr:{'for':AddresLine1.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="hide:AddresLine1.hide, css:AddresLine1.CssValid">
            <input type="text" class="form-control custom-input" data-bind="textInput:AddresLine1.value,
                                   attr: {
                                         id:AddresLine1.id ,
                                         'aria-invalid': !AddresLine1.isValid() ,
                                         'aria-describedby':AddresLine1.id+'ErrorBlock',
                                         'aria-required': AddresLine1.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:AddresLine1.ErrorListToShowHTML,
                 visible: AddresLine1.showError,attr:{id:AddresLine1.id+'ErrorBlock'}"></div>
    </div>

    <!-- state NEW -->
    <div class="form-group invoice-state-wrap" data-bind="hide:AddresLine2.hide">
        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(AddresLine2.Required, lang.lblInvAddress2),attr:{'for':AddresLine2.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="hide:AddresLine2.hide, css:AddresLine2.CssValid">
            <input type="text" class="form-control custom-input" data-bind="textInput:AddresLine2.value,
                   
                                   attr: {
                                        id:AddresLine2.id ,
                                        'aria-invalid': !AddresLine2.isValid() ,
                                        'aria-describedby':AddresLine2.id+'ErrorBlock',
                                        'aria-required': AddresLine2.Required},
                                   ">
        </div>
        <div class="alert alert-dange no-top-bottom-paddingr" role="alert" data-bind="html:AddresLine2.ErrorListToShowHTML,
                 visible: AddresLine2.showError,attr:{id:AddresLine2.id+'ErrorBlock'}"></div>
    </div>

    <!-- City NEW-->
    <div class="form-group margin-bottom-row invoice-city-wrap" data-bind="hide:City.hide">
        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(City.Required, lang.lblInvCity),attr:{'for':City.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="hide:City.hide, css:City.CssValid">
            <input type="text" class="form-control custom-input" data-bind="textInput:City.value,
                                   attr: {
                                        id:City.id,
                                        'aria-invalid': !City.isValid(),
                                        'aria-describedby':City.id+'ErrorBlock',
                                        'aria-required': City.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:City.ErrorListToShowHTML,
                 visible: City.showError,attr:{id:City.id+'ErrorBlock'}"></div>
    </div>

    <!-- Mobile NEW -->
    <div class="form-group invoice-mobile-wrap" data-bind="hide:MobilePH.hide">
    <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(MobilePH.Required, lang.ilblMobilPhone),attr:{'for':MobilePH.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="hide:MobilePH.hide, css:MobilePH.CssValid">
            
            <input type="text" class="form-control custom-input" data-bind="textInput:MobilePH.value,
                   event : { focusout:MobilePhoneFocusOut},
                   
                                   attr: {
                                        id:MobilePH.id,
                                        'aria-invalid': !MobilePH.isValid(),
                                        'aria-describedby':MobilePH.id+'ErrorBlock',
                                        'aria-required': MobilePH.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:MobilePH.ErrorListToShowHTML,
                 visible: MobilePH.showError,attr:{id:MobilePH.id+'ErrorBlock'}"></div>
    </div>

    <!-- LinePhone NEW -->
    <div class="form-group invoice-linephone-wrap" data-bind="hide:LinePH.hide">
        <label class="col-md-4 custom-label col-xs-12" data-bind="text: GetText(LinePH.Required, lang.ilblLinePhone),attr:{'for':LinePH.id} "></label>
        <div class="col-md-8 padding-left-right-15 col-xs-12" data-bind="hide:LinePH.hide, css:LinePH.CssValid">
            
            <input type="text" class="form-control custom-input" data-bind="textInput:LinePH.value,
                                   attr: {placeholder: lang.ilblLinePhone,
                                        id:LinePH.id,
                                        'aria-invalid': !LinePH.isValid(),
                                        'aria-describedby':LinePH.id+'ErrorBlock',
                                        'aria-required': LinePH.Required},
                                   ">
        </div>
        <div class="alert alert-danger no-top-bottom-padding" role="alert" data-bind="html:LinePH.ErrorListToShowHTML,
                 visible: LinePH.showError,attr:{id:LinePH.id+'ErrorBlock'}""></div>
    </div>
</form>`;
class PopUpErrorManager extends controlerBase {
    constructor(errorParams) {
        super();
        this.errorCode = '';
        this.errorDesc = '';
        this.errorTitle = '';
        this.Redirect = ko.observable(false);
        this.RedirectUrl = ko.observable('');
        this.ModalHeader = ko.observable('');
        this.CardComText = ko.observable('מצטערים על אי הנוחות אבל אירעה שגיאה, במידה והבעיה חוזרת אנא פנה לתמיכה 03-9436100');
        this.CardComTextVisible = ko.observable(true);
        this.ShowModal = ko.observable(false);
        this.IsValid = () => {
            return false;
        };
        this.CloseFrame = (command) => {
            if (window.self !== window.top) {
                parent.postMessage(command, '*');
            }
            else {
                window.location.href = this.RedirectUrl();
            }
        };
        this.Redirect(errorParams.EA4Init.controlInitError['Redirect']);
        this.RedirectUrl(errorParams.EA4Init.controlInitError['RedirectUrl']);
        this.errorCode = errorParams.EA4Init.controlInitError['ErrorCode'];
        this.ModalHeader('Error');
        if (this.errorCode == '99987') {
            this.CloseFrame('Redirect-' + this.RedirectUrl());
            return;
        }
        if (this.errorCode == '99981') {
            this.ModalHeader('Info');
            this.CardComTextVisible(false);
            document.location.href = this.RedirectUrl();
            return;
        }
        if (this.errorCode == '99982' || this.errorCode == '99983' || this.errorCode == '99984' || this.errorCode == '99985') {
            if (this.Redirect()) {
                document.location.href = this.RedirectUrl();
                return;
            }
            this.CardComTextVisible(false);
        }
        this.errorDesc = errorParams.EA4Init.controlInitError['ErrorDesc'];
        this.errorTitle = errorParams.EA4Init.controlInitError['ErrorTitle'];
        this.ShowModal(true);
        if (this.Redirect()) {
            setTimeout(() => {
                if (this.RedirectUrl() == '') {
                    this.CloseFrame('Success');
                }
                this.CloseFrame('Redirect-' + this.RedirectUrl());
            }, 3 * 1000);
        }
    }
}
PopUpErrorManager.MyErrorHtml = `
<div class="modal" tabindex="-1" role="dialog" id="mainPopupModal" data-bind="BsModal:true, visible:ShowModal" data-backdrop="static" data-keyboard="false">

    <div class="modal-dialog">
        <div class="modal-content" style="text-align:center">

            <!-- Header -->
            <div class="modal-header" >
                <button type="button" id="modalCloseBtn" data-bind="click:function(){ CloseFrame('Success');}" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" data-bind="text: ModalHeader"></h4>
            </div>

                    <!-- Error -->
            <div class="modal-body padding-25">
                    <!--<div data-bind='component: {name: "error",
                        params: { ControlInit: controlInitError,ModuleRef:SetErrorRef}},
                          visible:IsError'>
                    </div>-->
                <form class="form-horizontal">
                    <div class="form-group">
                        <label data-bind="text: 'Code'"></label>
                        <label data-bind="text: errorCode"></label>
                    </div>
                    <div class="form-group">
                        <label data-bind="text: errorDesc"></label>
                    </div>
                    <div class="form-group" >
                        <p data-bind="text:CardComText, visible: CardComTextVisible"></p>
                    </div>
                    <!--<div class="form-group">
                        <p>
                            תודה על ההבנה
                        </p>
                    </div>
                    <div class="form-group">
                        <p>
                            חברת קארדקום, שואפים לשירות טוב יותר
                        </p>
                    </div>-->
                </form>
                </div>

            </div>
        </div>
    </div>
</div>`;
PopUpErrorManager.MyNotExistErrorHtml = `
<div class="modal" tabindex="-1" role="dialog" id="mainPopupModal" data-bind="BsModal:true, visible:ShowModal" data-backdrop="static" data-keyboard="false">

    <div class="modal-dialog">
        <div class="modal-content" style="text-align:center">

            <!-- Header -->
            <div class="modal-header" >
                <button type="button" id="modalCloseBtn" data-bind="click:function(){ CloseFrame('Success');}" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" data-bind="text: ModalHeader"></h4>
            </div>

                    <!-- Error -->
            <div class="modal-body padding-25">
                <form class="form-horizontal">
                    <div class="form-group">
                        <label data-bind="text: errorTitle"></label>
                    </div>
                    <div class="form-group">
                        <p data-bind="text: errorDesc"></p>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</div>`;
class DealInfo extends controlerBase {
    constructor(params) {
        super();
        this.params = params;
        this.name = 'DealInfo';
        this.DealInfoType = DealInfoTypeEnum.DropDown;
        this.SummaryInput = new MyInput('Summery');
        this.Delivery = new MyInput('Delivery');
        this.payments = new MyInput("Payments");
        this.Kupon = new MyInput("Kupon");
        this.AllCurrencies = ko.observableArray();
        this.hideCurrentCurrency = ko.observable();
        this.currencyValueToNis = ko.observable();
        this.dealInfoDropdown = ko.observable();
        this.dealInfoList = ko.observable();
        this.workingDeal = ko.observable();
        this.commision = ko.observableArray();
        this.IsCommitionActive = false;
        this.vat = 1;
        this.showDropdownAndRadioDealInfo = ko.observable(true);
        this.showListDealInfo = ko.observable(false);
        this.singleItemToshow = ko.observable(false);
        this.hideItemDropdown = ko.observable(false);
        this.showPaymentsDesk = ko.observable(false);
        this.KuponType = ko.observable(0);
        this.KuponPrice = ko.observable(0);
        this.KuponPriceAvailable = ko.observable(false);
        this.isKuponActive = ko.observable(false);
        this.IsHideTotal = false;
        this.numOfPaymentsLbl = ko.observable('תשלומים');
        this.IsTruma = false;
        this.IsCredit = false;
        this.initCurrencies = (params) => {
            if (!params.ControlInit['IsConvertToNIS'] || !this.params.ControlInit["Currencies"])
                return;
            let inpArr = params.ControlInit["Currencies"];
            let outAsCiArr = inpArr.map(ci => new CoinInfo(ci)).sort((c1, c2) => c1.sortOrd() - c2.sortOrd());
            this.AllCurrencies(outAsCiArr);
            try {
                this.hideCurrentCurrency(this.params["ControlInit"]["Items"][0]);
            }
            catch (_) { }
            ;
        };
        this.IsValid = () => {
            var a = this.workingDeal().IsValid();
            var b = this.validateAll();
            this.Kupon.errorList.removeAll();
            var k = this.KuponIsValid();
            if (k == false) {
                this.Kupon.showError(true);
                this.Kupon.errorList.push(this.lang.ilblKuponInvalid);
            }
            return a && b && k;
        };
        this.focus = ko.observable(false);
        this.SetFocus = () => {
            this.focus(true);
        };
        this.SetDealInfoDropdownToInformationRef = (ModuelReg) => {
            this.dealInfoDropdown(ModuelReg);
            this.sonsContollers.push(ModuelReg);
            this.workingDeal(ModuelReg);
        };
        this.SetDealInfoListToInformationRef = (ModuelReg) => {
            this.dealInfoList(ModuelReg);
            this.sonsContollers.push(ModuelReg);
            this.workingDeal(ModuelReg);
        };
        this.GetDeliveryPrice = () => {
            let t = 0;
            ko.utils.arrayForEach(this.Delivery.slcObjWithCost(), (d) => {
                if (d.key == this.Delivery.value() && this.Delivery.hide() != true) {
                    t = d.Cost;
                }
            });
            return t;
        };
        this.sumAfterKupon = ko.pureComputed(() => {
            if (this.workingDeal()) {
                if (this.KuponPriceAvailable() == true) {
                    if (this.showListDealInfo()) {
                        if (this.KuponType() == 2) {
                            return Math.round((this.workingDeal().summary() * (this.KuponPrice() / 100) * 100)) / 100;
                        }
                        if ((this.workingDeal().summary() - this.KuponPrice()) < 0) {
                            return Math.round((this.workingDeal().summary()) * 100) / 100;
                        }
                        else {
                            return Math.round(((this.workingDeal().summary() - this.KuponPrice())) * 100) / 100;
                        }
                    }
                    else {
                        return this.KuponPrice() * this.workingDeal().quantity();
                    }
                }
                return this.workingDeal().summary();
            }
            return 0;
        });
        this.GetCommtionRowForCommitionTable = () => {
            if (this.IsCommitionActive == true && this.IsTruma == false) {
                return ko.utils.arrayFilter(this.commision(), (com) => {
                    return com.NumOfPayment.toString() == this.payments.value();
                })[0];
            }
            return undefined;
        };
        this.sum = ko.pureComputed(() => {
            let commissionProcentage = 0;
            let fix = 0;
            let vat = 1;
            let delivery = this.GetDeliveryPrice();
            if (this.IsCommitionActive == true && this.IsTruma == false) {
                let commission = ko.utils.arrayFilter(this.commision(), (com) => {
                    return com.NumOfPayment.toString() == this.payments.value();
                })[0];
                if (commission != undefined) {
                    commissionProcentage = commission.Percentage;
                    fix = commission.Fix != undefined ? commission.Fix : 0;
                }
            }
            if (this.workingDeal()) {
                if (isNaN(this.workingDeal().summary())) {
                    return 0;
                }
                let sumToAdd = 0;
                if (this.termial_type == 4) {
                    vat = this.vat;
                    sumToAdd = (this.sumAfterKupon() * (commissionProcentage) * vat + fix * vat + delivery);
                    return Math.round((this.sumAfterKupon() + sumToAdd) * 100) / 100;
                }
                else {
                    sumToAdd = this.sumAfterKupon() * (commissionProcentage) + fix + delivery;
                    return Math.round((this.sumAfterKupon() + sumToAdd) * 100) / 100;
                }
            }
            return 0;
        });
        this.sumWithCoinSignToDisplay = ko.pureComputed(() => {
            let tgtCoinLabel = " *";
            let translatedTotal = this.sum();
            let tgtCurrency = this.currencyValueToNis();
            try {
                if (this.IsConvertToNIS && tgtCurrency) {
                    tgtCoinLabel = tgtCurrency.CoinSing();
                    translatedTotal /= tgtCurrency.ValueToNis();
                    let srcCurrency = this.itmCoinInfo();
                    if (srcCurrency.Code() !== 1) {
                        translatedTotal *= srcCurrency.ValueToNis();
                    }
                }
            }
            catch (e) {
                console.error(e);
            }
            return number_format(translatedTotal, 2, '.', ',') + " " + tgtCoinLabel;
        });
        this.itmRef = ko.pureComputed(() => {
            if (this.workingDeal()) {
                if (this.workingDeal().selectedItemChanged) {
                    return this.workingDeal().selectedItemChanged();
                }
            }
        });
        this.itmCoinSign = ko.pureComputed(() => {
            if (this.DealInfoType == DealInfoTypeEnum.ShopingCart) {
                return this.GroupCoinSign;
            }
            else {
                if (this.workingDeal()) {
                    if (this.workingDeal().selectedItemChanged) {
                        return this.workingDeal().selectedItemChanged().coinSing;
                    }
                }
            }
        });
        this.itmCoinInfo = ko.computed(() => {
            let filterBy = (_) => true;
            if (this.itmRef() && this.itmRef().itmCoinCode)
                filterBy = (x) => x.Code() === this.itmRef().itmCoinCode;
            else if (this.GroupCoinCode)
                filterBy = (x) => x.Code() === this.GroupCoinCode;
            else if (this.itmCoinSign()) {
                filterBy = (x) => x.CoinSing() === this.itmCoinSign();
            }
            return this.AllCurrencies().filter(filterBy)[0];
        });
        this.itmPayments = ko.pureComputed(() => {
            if (this.workingDeal()) {
                if (this.workingDeal().IsMultiSelect) {
                    return this.IsShowHidePayments(this.payments.selectObjects());
                }
                else {
                    return this.IsShowHidePayments((this.workingDeal().selectedItemChanged().payments()));
                }
            }
            return null;
        });
        this.IsShowHidePayments = (pament) => {
            if (pament.length == 1 && pament[0].key == "1") {
                this.payments.hide(true);
            }
            else {
                this.payments.hide(false);
            }
            return pament;
        };
        this.sumToString = ko.pureComputed(() => {
            this.hideCurrentCurrency(this.itmCoinInfo());
            return number_format(Math.round(this.sum() * 100) / 100, 2, '.', ',') + " " + this.itmCoinSign();
        });
        this.filteredCurrencies = ko.computed(() => {
            let coinToFilterObj = this.hideCurrentCurrency();
            let filterCoin = coinToFilterObj ?
                (x) => x.Code != coinToFilterObj.Code :
                (_) => true;
            return this.AllCurrencies().filter(filterCoin);
        });
        this.paymentSummary = ko.pureComputed(() => {
            if (this.workingDeal()) {
                if (this.IsTruma) {
                    return number_format(this.sum(), 2, '.', ',') + this.itmCoinSign() + ' ' + this.lang.ilblEachPayment;
                }
                if (this.termial_type != 4) {
                    if (this.IsCredit && parseInt(this.payments.value()) >= 3) {
                        return number_format(Math.round(this.sum() / parseInt(this.payments.value()) * 100) / 100, 2, '.', ',') + this.itmCoinSign() + ' ' + this.lang.ilblEachPayment + ' (' + this.lang.CreditPaymentslbl + ')';
                    }
                }
                return number_format(Math.round(this.sum() / parseInt(this.payments.value()) * 100) / 100, 2, '.', ',') + this.itmCoinSign() + ' ' + this.lang.ilblEachPayment;
            }
        });
        this.DoNotDisplayKupon = ko.observable(false);
        this.ShowKupon = ko.pureComputed(() => {
            if (this.DoNotDisplayKupon() == true) {
                this.Kupon.hide(true);
                return false;
            }
            if (this.showListDealInfo()) {
                return this.isKuponActive();
            }
            else {
                if (this.workingDeal()) {
                    if (this.workingDeal().selectedItemChanged()) {
                        this.Kupon.value('');
                        this.KuponPrice(0);
                        this.tmpKupon = '';
                        this.KuponPriceAvailable(false);
                        if (this.workingDeal().selectedItemChanged().IsKuponActive) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
        });
        this.KuponIsValid = ko.observable(true);
        this.KuponError = ko.observable('');
        this.CheckKupon = () => {
            if (this.Kupon.value() != "") {
                if (this.tmpKupon != this.Kupon.value()) {
                    this.tmpKupon = this.Kupon.value();
                    let url = '/api/EA4/GetKuponItem';
                    let uid = '';
                    if (this.DealInfoType == DealInfoTypeEnum.ShopingCart) {
                        uid = this.GroupUID;
                        url = '/api/EA4/GetGroupKupon';
                    }
                    else {
                        uid = this.itmRef().UID;
                    }
                    let dataToSend = {
                        UID: uid,
                        kuponNumber: this.Kupon.value(),
                    };
                    let ajaxOption = {
                        type: 'POST',
                        url: url,
                        dataType: 'json',
                        contentType: "application/json",
                        data: JSON.stringify(dataToSend),
                    };
                    $.ajax(ajaxOption).done((data) => {
                        if (data.RespId != 0) {
                            if (data.RespId == 9992) {
                                this.Kupon.errorList.push(this.lang.ilblKuponOutOfStock);
                                this.KuponError(this.lang.ilblKuponOutOfStock);
                            }
                            else if (data.RespId == 9995) {
                                this.Kupon.errorList.push(this.lang.ilblKuponExpired);
                                this.KuponError(this.lang.ilblKuponExpired);
                            }
                            else {
                                this.Kupon.errorList.push(this.lang.ilblKuponInvalid);
                                this.KuponError(this.lang.ilblKuponInvalid);
                            }
                            this.Kupon.SetIsValid(false);
                            if (this.ShowKupon())
                                this.KuponIsValid(false);
                            else
                                this.KuponIsValid(true);
                            this.Kupon.showError(true);
                            this.KuponPriceAvailable(false);
                        }
                        else {
                            this.KuponType(data.Data.DiscountType);
                            this.KuponPriceAvailable(true);
                            this.KuponIsValid(true);
                            this.KuponPrice(data.Data.DiscountSUM);
                            if (this.DealInfoType != DealInfoTypeEnum.ShopingCart) {
                                this.KuponPrice(data.Data.KuponPrice);
                            }
                            this.tmpKupon = '';
                        }
                    });
                }
            }
            else {
                this.KuponPriceAvailable(false);
                this.KuponIsValid(true);
                this.Kupon.showError(false);
            }
        };
        this.selectedItems = new Array();
        this.GetAllValues = () => {
            this.selectedItems = new Array();
            if (this.showListDealInfo() == true) {
                ko.utils.arrayForEach(this.workingDeal().Items(), (itm) => {
                    if (itm.selectedQuantity() > 0) {
                        this.selectedItems.push({
                            UID: itm.UID,
                            quantity: itm.selectedQuantity(),
                            total: itm.total(),
                            desk: itm.desk
                        });
                    }
                });
            }
            else {
                this.selectedItems.push({
                    UID: this.itmRef().UID,
                    quantity: this.workingDeal().quantity(),
                    total: this.workingDeal().summary() ? this.workingDeal().summary() : this.itmRef().total(),
                    openSum: this.itmRef().openSum() ? this.itmRef().openSum() : this.itmRef().total(),
                    desk: this.itmRef().desk,
                });
            }
            let values = {
                summary: this.workingDeal().summary(),
                items: this.selectedItems,
                payments: this.payments.value(),
                kupon: this.Kupon.value()
            };
            return values;
        };
        this.Getdelivery = () => {
            return this.Delivery.value();
        };
        this.cancelMouseWheel = (d, e) => {
            return false;
        };
        this.dealInfo = params.ControlInit;
        this.InitController(params);
        this.initCurrencies(params);
        this.DealInfoType = params.ControlInit['DealInfoType'];
        this.GroupUID = params.ControlInit['GroupUID'];
        this.GroupCoinSign = params.ControlInit['coinSign'];
        this.GroupCoinCode = params.ControlInit['grpCoinCode'];
        this.isKuponActive(params.ControlInit['isKuponActive']);
        this.IsCredit = params.ControlInit['IsCredit'];
        this.IsHideTotal = params.ControlInit['IsHideTotal'] == true ? true : false;
        this.IsConvertToNIS = params.ControlInit['IsConvertToNIS'] ? true : false;
        this.termial_type = params.ControlInit['termial_type'];
        this.vat = params.ControlInit['vat'] != undefined ? params.ControlInit['vat'] : 1;
        this.IsCommitionActive = params.ControlInit['IsCommitionActive'] == true ? true : false;
        this.IsTruma = params.ControlInit['IsTruma'] == true ? true : false;
        if (this.IsTruma) {
            this.numOfPaymentsLbl(this.lang.ilblNumberOfPaymentsTrume);
        }
        else {
            this.numOfPaymentsLbl(this.lang.ilblNumberOfPayments);
        }
        ko.utils.arrayForEach(params.ControlInit['Commissions'], (comm) => {
            let tmpComm = new Commission(comm);
            this.commision.push(tmpComm);
        });
        this.payments.value.subscribe(() => {
            if (this.payments.value() == undefined || this.payments.value() == '1' || this.payments.value() == '0') {
                this.showPaymentsDesk(false);
            }
            else {
                this.showPaymentsDesk(true);
            }
        });
        if (params['singleItemChoosed']) {
            this.singleItemToshow(params['singleItemChoosed']);
            this.hideItemDropdown(true);
            return;
        }
        if (this.DealInfoType == DealInfoTypeEnum.ShopingCart) {
            this.showDropdownAndRadioDealInfo(false);
            this.showListDealInfo(true);
        }
        this.payments.inputType = 2;
    }
}
DealInfo.MYHtml = `<div class="form-horizontal deal-info">
    <!--<div data-bind="if:CommentVisible">
        <div id="deal-comments" class="alert alert-info" role="alert" data-bind="text:comments"></div>
    </div>-->
    <!-- Dropdown & Radio List Component-->
    <div  class="deal-info-dropdown-component-wrap" id="drop-radio-component-wrap" data-bind="if:showDropdownAndRadioDealInfo">
        <div data-bind='component:{
                         name: "deal-info-dropdown",
                         params:{ControlInit: dealInfo , ModuleRef:SetDealInfoDropdownToInformationRef,HideItemName:hideItemDropdown } }'>
        </div>
    </div>

    <!-- Multi selection without checkboxes only quantity-->
    <div class="deal-info-list-component-wrap" id="cart-list-component-wrap" data-bind="if: showListDealInfo">
        <div data-bind='component:{
                         name: "deal-info-list",
                         params:{ControlInit: dealInfo , ModuleRef:SetDealInfoListToInformationRef } }'>
        </div>
    </div>

    <!-- Number Of payments -->
   <div data-bind="if: workingDeal" >
    <div id="num-of-payments-div" class="form-group num-of-payments-wrap" data-bind="hide:payments.hide">
        <label id="num-of-payments-label" for="payments" class="col-md-3 custom-label" data-bind="text: numOfPaymentsLbl"></label>
        <div id="num-of-payments-input-div"  class="col-md-5 num-of-payments-input-wrap" data-bind="hide:payments.hide, css:payments.CssValid">
            <select class="form-control custom-input" data-bind="options: itmPayments,optionsText: 'text',optionsValue: 'key',value: payments.value,
			attr: { id:payments.id, 'aria-invalid': !payments.isValid() , 'aria-describedby':payments.id+'ErrorBlock'},
			event: { mousewheel: cancelMouseWheel }, "></select>
        </div>
        <div class="alert alert-danger no-top-bottom-padding col-md-5 col-md-offset-3 no-padding" role="alert" data-bind="html:payments.ErrorListToShowHTML,visible: payments.showError, attr:{ id:payments.id+'ErrorBlock'} "></div>
    </div>    
    </div>
    <!-- Delivery -->
    <div id="delivery-div" class="form-group delivery-wrap" data-bind="hide:Delivery.hide">
        <label id="delivery-label" for="itempayforselection" class="col-md-3 custom-label" data-bind="text: Delivery.label, hide:Delivery.hide, css:Delivery.CssValid"></label>
        <div id="delivery-input-div" class="col-md-5 delivery-input-wrap">
            <select id="itempayforselection" class="form-control custom-input" data-bind="options: Delivery.slcObjWithCost,event: { mousewheel: cancelMouseWheel } , value: Delivery.value, optionsText: function(item){if(item.Cost!=0){return item.text + itmCoinSign();}return item.text},optionsValue: 'key',"></select>
        </div>
    </div>

    <!-- Kupon -->
    <div id="kupon-div" class="form-group kupon-wrap" data-bind="if:ShowKupon">
        <label id="kupon-label" class="col-md-3 custom-label" data-bind="text: lang.ilblKupon, attr:{'for':Kupon.id} "></label>
        <div id="kupon-input-div" class="col-md-5 padding-left-right-15 kupon-input-wrap" data-bind="css:Kupon.CssValid">
            <input type="text" class="form-control custom-input kupon-input" data-bind="textInput:Kupon.value, attr: { id:Kupon.id, 'aria-invalid': !Kupon.isValid() , 'aria-describedby':Kupon.id+'ErrorBlock'}, event : { blur:CheckKupon}">
        </div>
        <div class="col-md-3 kupon-validation-wrap" id="kupon-validation">
            <input type="button" id="kupon-validate-btn" class="btn btn-default" data-bind="value: lang.ilblKuponValidation" />
        </div>
        <div class="alert alert-danger no-top-bottom-padding col-md-12" role="alert" data-bind="html:Kupon.ErrorListToShowHTML, visible: Kupon.showError, attr: { id:Kupon.id+'ErrorBlock',}">
        </div>
    </div>

    <!-- Summary -->
    <div id="items-summary-div" class="form-group items-summary-wrap" data-bind="hide:IsHideTotal">
        <label id="items-summery-label" for="items-summary" data-bind="text:lang.ilblProductPrice" class="col-md-3 custom-label"></label>
        <label class="col-md-3 custom-label"  data-bind="text: sumToString"></label>
    </div>
    <!-- Price By other currencies -->
    <div id="items-summary-currency-div" class="form-group items-summary-wrap" data-bind="if: IsConvertToNIS">
        <label id="items-TotalInCoin" for="items-summary" data-bind="text:lang.litTotalIn" class="col-md-3 custom-label"></label>
        <label id="items-TotalInCoin-label" class="col-md-3 custom-label" data-bind="text: sumWithCoinSignToDisplay"></label>
        <!-- Currency Price conversion -->
        <div id="currecny-select" class="col-md-5" data-bind="visible: IsConvertToNIS">
            <select id="select-price-currency" class="form-control custom-input" 
             style="direction: LTR;"
             data-bind="options: filteredCurrencies , value : currencyValueToNis ,
                        , optionsText: 'droplistCoinLabel',
                        , optionsValue: { valToNis : 'ValueToNis' , cionSymbol : 'CoinSing' }">
            </select>
        </div>
    </div>
    <div id="payments-summary-div" class="form-group payments-summary-wrap" data-bind="hide:IsHideTotal">
        <label id="payments-summary" data-bind="text: paymentSummary, visible:showPaymentsDesk" class="col-md-4 col-md-offset-3 custom-label"></label>
    </div>
</div>`;
class CoinInfo {
    constructor(inpObj) {
        this.AlphabeticCode = ko.observable();
        this.Code = ko.observable();
        this.CoinSing = ko.observable();
        this.CurrencyName = ko.observable();
        this.HebDescription = ko.observable();
        this.ValueToNis = ko.observable();
        this.droplistCoinLabel = ko.pureComputed(() => this.AlphabeticCode());
        this.sortOrd = ko.pureComputed(() => this.Code());
        this.AlphabeticCode(inpObj['AlphabeticCode']);
        this.Code(inpObj['Code']);
        this.CoinSing(inpObj['CoinSing']);
        this.CurrencyName(inpObj['CurrencyName']);
        this.HebDescription(inpObj['HebDescription']);
        this.ValueToNis(inpObj['ValueToNis']);
        this.droplistCoinLabel = ko.pureComputed(() => `${this.AlphabeticCode()} - ${this.CurrencyName()} (${this.CoinSing()})`);
        this.sortOrd = ko.pureComputed(() => {
            switch (this.AlphabeticCode()) {
                case "ILS":
                case "NIS": return 1;
                case "USD": return 2;
                case "EUR": return 3;
                case "GBP": return 4;
                default: return this.Code();
            }
        });
    }
}
;
class DealInfoDropdown extends controlerBase {
    constructor(params) {
        super();
        this.params = params;
        this.name = "DealInfoDropdown";
        this.selectedItemChanged = ko.observable();
        this.itemToPaySelect = new MyInput('itemToPayForDealInfo');
        this.openSum = new MyInput('openSum');
        this.quantity = ko.observable(1);
        this.quantityArray = ko.observable();
        this.selectedItem = ko.observable('1');
        this.Items = ko.observableArray();
        this.comments = ko.pureComputed(() => {
            if (this.selectedItemChanged().ItemCommets) {
                this.CommentVisible(true);
                return this.selectedItemChanged().ItemCommets;
            }
            else {
                this.CommentVisible(false);
                return '';
            }
        });
        this.CommentVisible = ko.observable(false);
        this.showDropdown = ko.observable(true);
        this.showPaymentsDesk = ko.observable(false);
        this.hideItemSelection = ko.observable(false);
        this.hideQuantity = ko.observable(false);
        this.IsnotZero = (value) => {
            if (value == '')
                return true;
            if (value > 0)
                return true;
            return false;
        };
        this.IsValid = () => {
            return this.validateAll();
        };
        this.itemOriginalPrice = ko.pureComputed(() => {
            try {
                if (this.selectedItemChanged().IsManualSum) {
                    this.selectedItemChanged().openSum(this.openSum.value());
                    return parseFloat(this.openSum.value()) * this.quantity();
                }
                else {
                    return this.selectedItemChanged().price * this.quantity();
                }
            }
            catch (e) {
                return 0;
            }
        });
        this.itemPriceAfterDiscount = ko.pureComputed(() => {
            return Math.round(this.itemOriginalPrice() * 100) / 100;
        });
        this.summary = ko.pureComputed(() => {
            return this.itemPriceAfterDiscount();
        });
        this.Clear = () => {
            this.openSum.value('');
            this.quantity(1);
        };
        this.IsMultiSelect = false;
        this.OpenSumCorrect = () => {
        };
        this.cancelMouseWheel = (d, e) => {
            return false;
        };
        this.InitController(params);
        ko.utils.arrayForEach(params.ControlInit['Items'], (itm) => {
            let tmp = new Items(itm);
            this.Items.push(tmp);
        });
        let componentToShow = params.ControlInit['DealInfoType'];
        if (componentToShow != DealInfoTypeEnum.RedioList) {
            this.showDropdown(true);
        }
        else {
            this.showDropdown(false);
        }
        this.hideItemSelection(params['HideItemName']() || this.Items().length == 1);
        this.selectedItemChanged.subscribe((newVal) => {
            if (newVal.quantity.length == 1 && newVal.quantity[0] == 1) {
                this.hideQuantity(true);
            }
            else {
                this.hideQuantity(false);
            }
            this.quantityArray(newVal.quantity);
            if (newVal.IsManualSum) {
                this.openSum.hide(false);
            }
            else {
                this.openSum.hide(true);
            }
        });
        this.selectedItemChanged(this.Items()[0]);
        this.selectedItemChanged().selectedQuantity(1);
        this.openSum.validators.push(new CustomValidator('ilbInputPriceNumberOnly', this.IsnotZero));
    }
}
DealInfoDropdown.MyHtml = `<!-- Dropdown -->

<div class="dropdown-wrap" data-bind="if: showDropdown">
    <div class="form-group items-summery-wrap" data-bind="if:hideItemSelection">
        <label id="items-summary-label-dropdown" for="items-summary-dropdown" data-bind="text:lang.ilblSelectProduct" class="col-md-3 custom-label"></label>
        <p class="col-md-5 custom-label" id="items-summary-dropdown" data-bind="text: selectedItemChanged().desk"></p>

    </div>
    <div  class="form-group item-selection-wrap" data-bind="ifnot:hideItemSelection">
        <label id="itempayforselection-label" for="itempayforselection" class="col-md-3 custom-label" data-bind="text: lang.ilblSelectProduct, hide:itemToPaySelect.hide, css:itemToPaySelect.CssValid"></label>
        <div class="col-md-5 itempayforselection-input-wrap">
            <select id="itempayforselection" class="form-control custom-input" data-bind="options: Items, optionsText: 'desk',value: selectedItemChanged,event: { mousewheel: cancelMouseWheel }"></select>
        </div>
    </div>
</div>

<!-- Radio List -->
<div class="radio-list-wrap" data-bind="ifnot: showDropdown">
    <div class="radio-list-items-wrap" data-bind="foreach: Items">
        <div class="radio">
            <label>
                <input class="custom-input" name="selectitem" type="radio" data-bind="checkedValue: $data,
                        checked:$parent.selectedItemChanged,
                        value:desk" />
                <span data-bind="text: desk"></span>
            </label>
            <br />
        </div>
    </div>
</div>
<!-- item Comments -->
<div class="comment-wrap" data-bind="visible:CommentVisible">
    <div id="comments" class="alert alert-info comments" role="alert" tabindex="0" data-bind="text:comments" style="margin-bottom:5px;padding:10px"></div>
</div>
<!-- Open Sum-->
<div class="form-group open-sum-wrap" data-bind="hide:openSum.hide">
    <label id="open-sum-label" class="col-md-3 custom-label" data-bind="text: lang.ilblDonation, attr:{'for':openSum.id} "></label>
    <div class="col-md-5 padding-left-right-15 open-sum-input-wrap" data-bind="css:openSum.CssValid">
        <input id="open-sum" type="text" class="form-control custom-input" data-bind="textInput:openSum.value,attr: {placeholder: lang.ilblDonation, id:openSum.id,'aria-invalid': !openSum.isValid(),'aria-describedby':openSum.id+'ErrorBlock','aria-required': openSum.Required},event : { blur:OpenSumCorrect}">
    </div>
    <div class="alert alert-danger no-top-bottom-padding col-md-12" role="alert" data-bind="html:openSum.ErrorListToShowHTML, visible: openSum.showError, attr:{id:openSum.id+'ErrorBlock'}"></div>
</div>

<!-- Quantity dropdown -->
<div class="form-group item-quantuty-dropdown-wrap" data-bind="hide: hideQuantity">
    <label id="item-quantity-label" for="items-quantity" data-bind="text:lang.ilblQuantity" class="col-md-3 custom-label"></label>
    <div class="col-md-5 item-quantity-input-wrap">
        <select id="items-quantity" class="form-control custom-input" data-bind="options: quantityArray,value:quantity,event: { mousewheel: cancelMouseWheel }"></select>
    </div>
</div>
`;
class DealInfoItemList extends controlerBase {
    constructor(params) {
        super();
        this.params = params;
        this.name = 'DealInfoItemList';
        this.Items = ko.observableArray();
        this.isKuponActive = ko.observable(false);
        this.showPaymentsDesk = ko.observable(false);
        this.ShowSelectOnItems = ko.observable(false);
        this.ShowErrorInDIv = ko.observable('');
        this.IsShowProductPriceTmp = ko.observable(false);
        this.IsShowProductPrice = ko.pureComputed(() => {
            if (this.IsShowProductPriceTmp()) {
                return 'table-cell';
            }
            else
                return 'none';
        });
        this.summary = ko.pureComputed(() => {
            let total = 0;
            ko.utils.arrayForEach(this.Items(), (itm) => {
                total += itm.total();
            });
            return total;
        });
        this.IsValid = () => {
            let count = 0;
            this.errorsList.messages.removeAll();
            this.ShowSelectOnItems(false);
            this.ShowErrorInDIv('');
            ko.utils.arrayForEach(this.Items(), (itm) => {
                count += itm.selectedQuantity();
            });
            if (count == 0) {
                this.ShowSelectOnItems(true);
                this.ShowErrorInDIv(this.lang.NoProductsSelected);
                this.errorsList.push('ShoppingCart', this.lang.NoProductsSelected);
                return false;
            }
            return this.validateAll();
        };
        this.IsMultiSelect = true;
        this.cancelMouseWheel = (d, e) => {
            return false;
        };
        this.InitController(params);
        ko.utils.arrayForEach(params.ControlInit['Items'], (itm) => {
            let itmData = new Items(itm);
            itmData.coinSing = params.ControlInit['coinSign'];
            itmData.coinAlfaCode = params.ControlInit['coinCode'];
            let GroupCoinCode = params.ControlInit['grpCoinCode'];
            if (this.params.ControlInit['DealInfoType'] === 2) {
                let allCoinsParams = params.ControlInit["Currencies"];
                if (allCoinsParams === null || allCoinsParams === void 0 ? void 0 : allCoinsParams.length) {
                    let coinInfoFound = allCoinsParams.filter(x => x.Code === GroupCoinCode)[0];
                    if (coinInfoFound) {
                        itmData.coin_type = coinInfoFound.Code;
                        itmData.coinSing = coinInfoFound.CoinSing;
                        itmData.coinAlfaCode = coinInfoFound.AlphabeticCode;
                    }
                }
            }
            this.Items.push(itmData);
        });
        this.IsShowProductPriceTmp(params.ControlInit['IsRemoveProductPrice'] == false);
    }
}
DealInfoItemList.MyHtml = `<style>


    @media (max-width: 768px) { /* use the max to specify at each container level */
        .specifictd {
             /* adjust to desired wrapping */
            white-space: pre-wrap; /* css-3 */
            white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
            white-space: -pre-wrap; /* Opera 4-6 */
            white-space: -o-pre-wrap; /* Opera 7 */
            word-wrap: break-word; /* Internet Explorer 5.5+ */
            white-space:normal !important;
        }
    }
</style>
<div class="form-group item-list-wrap">
    <div class="table-responsive item-list-tabel-wrap">
        <table class="table table-striped" data-bind='attr:{summary:lang.CartTable}' role="presentation">
            <thead>
                <tr>
                    <th id="item-list-th-item" class="specifictd" scope="col" id="item" data-bind="text: lang.Item"></th>
                    <th id="item-list-th-quantity" class="specifictd" scope="col" id="item-quantity" data-bind="text: lang.ilblQuantity"></th>
                    <th id="item-list-th-unit-price" class="specifictd" scope="col" id="item-price" data-bind="text: lang.UnitPrice,style:{display:IsShowProductPrice}"></th>
                    <th id="item-list-th-total-cost-for-items" class="hidden-xs hidden-sm specifictd" scope="col" id="item-total-price" data-bind="text: lang.ilblTotalCostForItem, style:{display:IsShowProductPrice}"></th>
                </tr>
            </thead>
            <tbody data-bind="foreach: Items">
                <tr>
                    <td class="specifictd items-list-td" headers="item" data-bind="text: desk"></td>
                    <td class="specifictd items-list-td" headers="item-quantity">
                        <select style="width:50px;" class="form-control custom-input no-padding-left-rigth item-quantity-select" data-bind="options: quantity,  value: selectedQuantity,event: { mousewheel: $parent.cancelMouseWheel } "></select>
                    </td>
                    <td  class="specifictd items-list-td" headers="item-price" data-bind="text: displayPrice,visible:$parent.IsShowProductPriceTmp,style:{display:$parent.IsShowProductPrice}"></td>
                    <td class="hidden-xs hidden-sm items-list-td" headers="item-total-price" data-bind="visible:$parent.IsShowProductPriceTmp,style:{display:$parent.IsShowProductPrice}"><div class="cell-wrapper" data-bind="text: displayRowTotal"></div></td>
                </tr>
            </tbody>
            <tfoot class="item-list-tfoot" data-bind="visible:ShowSelectOnItems">
                <tr>
                    <td colspan="4">
                        <div id="item-list-error-wrap" class="alert alert-danger item-list-error-wrap" data-bind="text:ShowErrorInDIv">

                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
`;
var DealInfoTypeEnum;
(function (DealInfoTypeEnum) {
    DealInfoTypeEnum[DealInfoTypeEnum["DropDown"] = 0] = "DropDown";
    DealInfoTypeEnum[DealInfoTypeEnum["RedioList"] = 1] = "RedioList";
    DealInfoTypeEnum[DealInfoTypeEnum["ShopingCart"] = 2] = "ShopingCart";
})(DealInfoTypeEnum || (DealInfoTypeEnum = {}));
var langs;
(function (langs) {
    function SetLan(lng) {
        langs.lan = lng;
    }
    langs.SetLan = SetLan;
    function Get(key) {
        if (key == null || key == undefined) {
            return "key is null";
        }
        if (langs.lan[key] == null || langs.lan[key] == undefined) {
            return key;
        }
        else {
            return langs.lan[key];
        }
    }
    langs.Get = Get;
})(langs || (langs = {}));
var langs;
(function (langs) {
    function en() {
        return {
            'test': 'Test',
            'PayButton': 'Pay Now',
            'Cvv': 'Cvv',
            'CvvPlaceholder': 'CVV',
            'CVVReq': "Req plase enter",
            'CVVNumberOnly': "Number only",
            'CVV4Or3Only': "שלוש או ארבע ספרות בלבד",
            'CardNumber': 'Credit card',
            'CardOwnerID': 'ת.ז. בעל/ת כרטיס',
            'CardOwnerName': 'שם בעל/ת הכרטיס',
            'CardOwnerPhone': 'טלפון בעל/ת הכרטיס',
            'CreditCardReq': 'חובה להקליד מספר כרטיס',
            'Email': 'דוא"ל',
            'EmailReq': "שדה חובה",
            'EmailInvalid': 'דוא"ל לא תקין'
        };
    }
    langs.en = en;
    ;
})(langs || (langs = {}));
var langs;
(function (langs) {
    function he() {
        return {
            'test': 'בדיקה',
            'PayButton': 'שלם עכשיו',
            'Cvv': '3 ספרות בגב הכרטיס',
            'CvvPlaceholder': 'CVV',
            'CVVReq': "שדה חובה",
            'CVVNumberOnly': "מספרים בלבד",
            'CVV4Or3Only': "שלוש או ארבע ספרות בלבד",
            'CardNumber': 'מספר הכרטיס',
            'CardOwnerID': 'ת.ז. בעל/ת כרטיס',
            'CardOwnerName': 'שם בעל/ת הכרטיס',
            'CardOwnerPhone': 'טלפון בעל/ת הכרטיס',
            'CreditCardReq': 'חובה להקליד מספר כרטיס',
            'Email': 'דוא"ל',
            'EmailReq': "שדה חובה",
            'EmailInvalid': 'דוא"ל לא תקין'
        };
    }
    langs.he = he;
    ;
})(langs || (langs = {}));
class Validator {
    constructor(messageId, regex) {
        this.messageId = messageId;
        this.regex = regex;
        this.IsValid = (value) => {
            var reg = new RegExp(this.regex);
            var valueToCheck = (value !== undefined && value !== null) ? value.trim() : '';
            return reg.test(valueToCheck);
        };
    }
}
class CustomValidator extends Validator {
    constructor(messageId, customFunction) {
        super(messageId, "");
        this.messageId = messageId;
        this.IsValid = (value) => {
            return this.customFunction(value);
        };
        this.customFunction = customFunction;
    }
}
class IdValidator extends Validator {
    constructor(messageId) {
        super(messageId, "");
        this.messageId = messageId;
        this.validation = (str) => {
            var IDnum = String(str).trim();
            if (IDnum.length == 0)
                return true;
            if ((IDnum.length > 9) || (IDnum.length < 5))
                return false;
            if (isNaN(parseInt(IDnum)))
                return false;
            if (IDnum.length < 9) {
                while (IDnum.length < 9) {
                    IDnum = '0' + IDnum;
                }
            }
            var mone = 0, incNum;
            for (var i = 0; i < 9; i++) {
                incNum = Number(IDnum.charAt(i));
                incNum *= (i % 2) + 1;
                if (incNum > 9)
                    incNum -= 9;
                mone += incNum;
            }
            if (mone % 10 == 0)
                return true;
            else
                return false;
        };
        this.IsValid = (value) => {
            return this.validation(value);
        };
    }
}
var ApplePayButtonKind;
(function (ApplePayButtonKind) {
    ApplePayButtonKind[ApplePayButtonKind["Setup"] = 0] = "Setup";
    ApplePayButtonKind[ApplePayButtonKind["Buy"] = 1] = "Buy";
    ApplePayButtonKind[ApplePayButtonKind["Subscribe"] = 2] = "Subscribe";
    ApplePayButtonKind[ApplePayButtonKind["Donate"] = 3] = "Donate";
})(ApplePayButtonKind || (ApplePayButtonKind = {}));
;
var PaymentAuthorizationResultAction;
(function (PaymentAuthorizationResultAction) {
    PaymentAuthorizationResultAction[PaymentAuthorizationResultAction["Success"] = 0] = "Success";
    PaymentAuthorizationResultAction[PaymentAuthorizationResultAction["FailSoCancel"] = 1] = "FailSoCancel";
    PaymentAuthorizationResultAction[PaymentAuthorizationResultAction["FailButRetry"] = 2] = "FailButRetry";
})(PaymentAuthorizationResultAction || (PaymentAuthorizationResultAction = {}));
class ApplePayJSFront {
    constructor(_compName, _processAuthedPaymentTokenHandler, loader) {
        this.PaymentAuthResultArray = ko.observableArray();
        this.flagObservabels = {
            _supportedByDevice: ko.observable(false),
            _canMakePayments: ko.observable(false),
            _supportsSetup: ko.observable(false),
            _iframeCrossOriginDetected: ko.observable(false),
        };
        this.flagsComputed = {
            _ApplePay: ko.computed(() => this.flagObservabels._supportedByDevice(), this),
            _PaymentBtn: ko.computed(() => {
                const f = this.flagObservabels;
                return (f._supportedByDevice() && !f._iframeCrossOriginDetected() && f._canMakePayments());
            }, this),
            _SetupBtn: ko.computed(() => {
                const f = this.flagObservabels;
                return (f._supportedByDevice() && !f._iframeCrossOriginDetected() && f._supportsSetup() && !f._canMakePayments());
            }, this),
            _PopupBtn: ko.computed(() => {
                const f = this.flagObservabels;
                return f._supportedByDevice() && f._iframeCrossOriginDetected();
            }, this),
        };
        this.beginPaymentAP = (request) => {
            this.session = new ApplePaySession(this.applePayVersion, request);
            this.session.onvalidatemerchant = this.onValidateMerchant;
            this.session.onpaymentauthorized = this.onPaymentAuthorized;
            this.session.oncancel = this.onCancel;
            this.session.begin();
        };
        this.onValidateMerchant = (event) => {
            const data = {
                validationUrl: event.validationURL,
                StoreName: this.storeName,
                MerchantDomain: this.GetParentHostName(),
                SourceUrl: window.location.href
            };
            const request = {
                url: this.validationResource,
                method: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data),
            };
            let ajaxRequest = $.ajax(request);
            try {
                let informMerchantValidationRequestTimeout = setTimeout(() => {
                    ajaxRequest.abort();
                    window.dispatchEvent(new CustomEvent('MerchantValidationRequestTimeout'));
                }, 30 * 1000);
                ajaxRequest
                    .then(jsonStr => JSON.parse(jsonStr))
                    .then((merchantSession) => {
                    clearTimeout(informMerchantValidationRequestTimeout);
                    this.session.completeMerchantValidation(merchantSession);
                })
                    .fail(ex => {
                    ajaxRequest.abort();
                });
            }
            catch (error) {
                ajaxRequest.abort();
            }
        };
        this.GetParentHostName = () => {
            let MerchantDomain;
            try {
                if (window.location !== window.parent.location) {
                    const originUrl = window.location.ancestorOrigins[0];
                    MerchantDomain = new URL(originUrl).hostname;
                }
                else {
                    MerchantDomain = window.location.hostname;
                }
            }
            catch (_a) {
                const originUrl = document.referrer;
                MerchantDomain = new URL(originUrl).hostname;
            }
            return MerchantDomain;
        };
        this.onPaymentAuthorized = (event) => {
            const payment = event.payment;
            this.PaymentAuthResultArray.removeAll();
            let handler = this.processAuthedPaymentTokenHandler || this.processAuthedPaymentTokenHandlerDefault;
            handler(payment);
            this.session.abort();
        };
        this.pushPaymentAuthResult = (resultAction, resultMessage) => {
            let uiResult;
            switch (resultAction) {
                case PaymentAuthorizationResultAction.Success:
                    uiResult = {
                        status: ApplePaySession.STATUS_SUCCESS,
                        errors: []
                    };
                    break;
                case PaymentAuthorizationResultAction.FailSoCancel:
                    uiResult = {
                        status: ApplePaySession.STATUS_FAILURE,
                        errors: []
                    };
                    break;
                case PaymentAuthorizationResultAction.FailButRetry:
                    uiResult = {
                        status: ApplePaySession.STATUS_FAILURE,
                        errors: [
                            new ApplePayError("unknown", undefined, resultMessage || "some failure occured handling the token data"),
                        ]
                    };
                    break;
                default:
                    throw 'unexpected value for `PaymentAuthorizationResultAction` passed to `pushPaymentAuthResult(..)`';
            }
            this.PaymentAuthResultArray.push(uiResult);
        };
        this.getActiveApplePaySession = () => this.session;
        this.onCancel = () => {
            var _a;
            window.dispatchEvent(new CustomEvent('ApplePayUICanceled'));
            (_a = this.loader) === null || _a === void 0 ? void 0 : _a.Hide();
        };
        this.setupApplePay = () => {
            return ApplePaySession.openPaymentSetup(this.merchantIdentifier)
                .then((setupResult) => {
                if (setupResult == true) {
                    this.initAllFlags();
                }
                else {
                }
                return setupResult;
            }).catch((err) => {
                let errMsg = `Setting up Apple Pay has thrown an error: ${JSON.stringify(err)}`;
                return false;
            });
        };
        this.storeName = $("meta[name='apple-pay-store-name']").attr("content") || _compName;
        this.validationResource = $("link[rel='merchant-validation']").attr("href") || "/ApplePayAPI/MerchantValidation";
        this.paymentResource = $("link[rel='AP-payment-parsing']").attr("href") || "/ApplePayAPI/ValidatePaymentToken";
        this.applePayVersion = ApplePayJSFront.highestSupportableVersion() || 8;
        this.countryCode = $("meta[name='payment-country-code']").attr("content") || "IL";
        this.currencyCode = $("meta[name='payment-currency-code']").attr("content") || "ILS";
        this.StartPaymentAuthResultWatcher();
        if (_processAuthedPaymentTokenHandler)
            this.processAuthedPaymentTokenHandler = _processAuthedPaymentTokenHandler;
        window.addEventListener('PaymentTryResultFromServer', (event) => {
            this.pushPaymentAuthResult(event.detail.actionResult, event.detail.actionMessage);
        });
        this.initAllFlags();
        this.loader = loader;
    }
    initAllFlags() {
        const f = this.flagObservabels;
        f._supportedByDevice(ApplePayJSFront.SupportedByDevice());
        if (f._supportedByDevice() == false) {
            return;
        }
        try {
            f._canMakePayments(ApplePaySession.canMakePayments());
            if (f._canMakePayments() == false) {
                ApplePaySession.canMakePaymentsWithActiveCard(ApplePayJSFront.merchantIdName)
                    .then(ans => f._canMakePayments(ans));
            }
        }
        catch (_a) { }
        try {
            f._supportsSetup(ApplePayJSFront.supportsSetup());
        }
        catch (_b) { }
        try {
            ApplePaySession.canMakePayments();
        }
        catch (ex) {
            let domEx = ex;
            if (domEx && domEx.message && domEx.message.indexOf("different security origin than its top-level frame") >= 0
                && domEx.name.match(/InvalidAccessError/ig).length >= 1)
                f._iframeCrossOriginDetected(true);
        }
    }
    initialize() {
    }
    static SupportedByDevice() {
        return "ApplePaySession" in window && ApplePaySession !== undefined;
    }
    static supportsSetup() {
        return "openPaymentSetup" in ApplePaySession;
    }
    static highestSupportableVersion() {
        if (ApplePayJSFront.SupportedByDevice() === false)
            return -1;
        let v = 15;
        for (v; v > 1; v--)
            try {
                if (ApplePaySession.supportsVersion(v))
                    return v;
            }
            catch (_a) {
                return -1;
            }
        throw 'browser supported, but no version could be identified (?)';
    }
    processAuthedPaymentTokenHandlerDefault(payment) {
        let request = {
            url: this.paymentResource,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(payment.token),
        };
        return $.ajax(request)
            .done(resJson => {
            const res = JSON.parse(resJson);
            let resultAction = PaymentAuthorizationResultAction.FailSoCancel;
            if (res.RespId === 0) {
                resultAction = PaymentAuthorizationResultAction.Success;
                window.dispatchEvent(new CustomEvent('ApplePayAuthTokenValidatedByServer', {
                    detail: {
                        'ParseTokenResponse': res,
                        'OriginallyProvidedToken': payment.token,
                    }
                }));
            }
            this.pushPaymentAuthResult(resultAction, res.RespDesk);
        })
            .fail(failure => {
            this.pushPaymentAuthResult(PaymentAuthorizationResultAction.FailSoCancel, "אירעה שגיאה בלתי צפויה בנסיון לאמת את פרטי התשלום בצד השרת");
        });
    }
    StartPaymentAuthResultWatcher() {
        this.PaymentAuthResultArray.subscribe((changes) => {
            for (let change of changes)
                if (change.status === "added")
                    this.consumePaymentAuthResult(change.value);
        }, null, "arrayChange");
    }
    consumePaymentAuthResult(authResult) {
        try {
            this.session.completePayment(authResult);
            window.dispatchEvent(new CustomEvent('ApplePayAuthResultConsumedByUI', {
                detail: {
                    'ParseTokenResponse': authResult,
                }
            }));
        }
        catch (ex) {
        }
    }
    closePaymentSheet() {
        try {
            this.session.abort();
        }
        catch (ex) {
        }
    }
}
ApplePayJSFront.merchantIdName = "merchant.example.gilad";
const ApplePayError = window.ApplePayError;
class CardcomBitJSFront {
    constructor(bitLink, txtMain, txtButton, txtDifferentPaymentMethod) {
        this._html = `<div id="cc-bit-modal-content" class="modal-content" style="padding:20px;text-align:center;width:80%;margin:auto;border-radius:10px;background-color:#fff;">
    <p id="cc-bit-modal-txt-main" style="font-size:22px;"></p>
        <button id="bit-payment-button" class="cc-bit-modal-btn" type="button" style="margin:auto;margin-bottom: 20px;">
        </button>
    <span id="cc-bit-modal-different-payment-method" style="font-size:16px;text-decoration:underline;"></span>
  </div>
</div>`;
        this._bitLink = '';
        this._txtMain = '';
        this._txtButton = '';
        this._txtDifferentPaymentMethod = '';
        this.ShowPopup = () => {
            var modal = document.getElementById('cc-bit-modal');
            modal.style.display = 'block';
        };
        this.ClosePopup = () => {
            var modal = document.getElementById('cc-bit-modal');
            modal.style.display = 'none';
            document.getElementsByClassName('cc-bit-modal-btn')[0].removeEventListener('click', this.OpenBitLink, false);
            document.getElementById('cc-bit-modal-different-payment-method').removeEventListener('click', this.ClosePopup, false);
            modal.remove();
            if (this.OnCLoseEvent != undefined) {
                this.OnCLoseEvent();
            }
        };
        this.OpenBitLink = () => {
            window.open(this._bitLink, '_blank');
        };
        this._bitLink = bitLink;
        this._txtMain = txtMain;
        this._txtButton = txtButton;
        this._txtDifferentPaymentMethod = txtDifferentPaymentMethod;
        const div = document.createElement('div');
        div.setAttribute('id', 'cc-bit-modal');
        div.setAttribute('class', 'modal');
        div.innerHTML = this._html;
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        document.body.append(div);
        const bitDiv = document.getElementById('cardcom-bit-container-div');
        if (bitDiv) {
            const top = window.innerHeight / 2;
            const modalContentEl = document.getElementById('cc-bit-modal-content');
            modalContentEl.style.top = `${top}px`;
        }
        document.getElementById('cc-bit-modal-txt-main').innerText = this._txtMain;
        document.getElementById('cc-bit-modal-different-payment-method').innerText = this._txtDifferentPaymentMethod;
        document.getElementsByClassName('cc-bit-modal-btn')[0].addEventListener('click', this.OpenBitLink, false);
        document.getElementById('cc-bit-modal-different-payment-method').addEventListener('click', this.ClosePopup, false);
    }
}
ko.bindingHandlers['hide'] = {
    'update': function (element, valueAccessor) {
        var value = !ko.utils.unwrapObservable(valueAccessor());
        var isCurrentlyVisible = !(element.style.display == "none");
        if (value && !isCurrentlyVisible)
            element.style.display = "";
        else if ((!value) && isCurrentlyVisible)
            element.style.display = "none";
    }
};
ko.extenders['numeric'] = function (target, precision) {
    var result = ko.computed({
        read: target,
        write: function (newValue) {
            var current = target();
            var roundingMultiplier = Math.pow(10, precision);
            var newValueAsNum = 0;
            if (newValue)
                newValueAsNum = isNaN(newValue) ? 0 : parseFloat(newValue);
            var valueToWrite = Math.round(newValueAsNum * roundingMultiplier) / roundingMultiplier;
            if (valueToWrite != current) {
                target(valueToWrite);
            }
            else if (newValue !== current) {
                target.notifySubscribers(valueToWrite);
            }
        }
    }).extend({ notify: 'always' });
    result(target());
    return result;
};
function rawNumber(val) {
    return Number(val.replace(/[^\d\.\-]/g, ''));
}
function number_format(num, decimals, dec_point, thousands_sep) {
    num = (num + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+num) ? 0 : +num, prec = !isFinite(+decimals) ? 0 : Math.abs(decimals), sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep, dec = (typeof dec_point === 'undefined') ? '.' : dec_point, s = '', toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
    };
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
ko.bindingHandlers['numericValue'] = {
    init: function (element, valueAccessor, allBindingsAccessor, context) {
        var underlyingObservable = valueAccessor();
        var interceptor = ko.computed({
            read: underlyingObservable,
            write: function (value) {
                underlyingObservable(rawNumber(value));
            }
        });
        ko.bindingHandlers.value.init(element, function () { return interceptor; }, allBindingsAccessor, 'undefined', undefined);
    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        element.value = number_format(valueAccessor()(), 2);
    }
};
ko.bindingHandlers['numericText'] = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        element.innerHTML = number_format(valueAccessor()(), 2);
    }
};
ko.bindingHandlers['resText'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        return ko.bindingHandlers.text.init(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var text = langs.Get(ko.utils.unwrapObservable(valueAccessor()));
        ko.bindingHandlers.text.update(element, function () { return text; }, allBindingsAccessor, viewModel, bindingContext);
    }
};
ko.bindingHandlers['resValue'] = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var text = langs.Get(ko.utils.unwrapObservable(valueAccessor()));
        return ko.bindingHandlers.value.init(element, function () { return text; }, allBindingsAccessor, viewModel, bindingContext);
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var text = langs.Get(ko.utils.unwrapObservable(valueAccessor()));
        ko.bindingHandlers.value.update(element, function () { return text; }, allBindingsAccessor, viewModel, bindingContext);
    }
};
ko.bindingHandlers['resAttr'] = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, context) {
        var json = ko.utils.unwrapObservable(valueAccessor());
        for (var attr in json) {
            var text = langs.Get(ko.utils.unwrapObservable(json[attr]));
            ko.bindingHandlers.attr.update(element, function () { var x = {}; x[attr] = text; return x; }, allBindingsAccessor, viewModel, context);
        }
    }
};
ko.bindingHandlers.ErrorPopup = {
    'init': function (element, valueAccessor) {
        var local = ko.utils.unwrapObservable(valueAccessor());
        var options = {};
        ko.utils.extend(options, ko.bindingHandlers.ErrorPopup.options);
        ko.utils.extend(options, local);
        $(element).tooltip(options);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).tooltip("destroy");
        });
    },
    'update': function (element, valueAccessor) {
        var local = ko.utils.unwrapObservable(valueAccessor());
        var options = {};
        ko.utils.extend(options, ko.bindingHandlers.ErrorPopup.options);
        ko.utils.extend(options, local);
        $(element).data("bs.tooltip").options.title = "<div id=" + ko.utils.unwrapObservable(options['ariaDescribedbyID']) + ">" + ko.utils.unwrapObservable(options['title']) + "</div>";
        if (ko.utils.unwrapObservable(options['visible'])) {
            if (ko.utils.unwrapObservable(options['placement']) != 'bottom') {
                $(element).tooltip('show', ko.utils.unwrapObservable(options['placement']));
            }
            else {
                $(element).tooltip('show');
            }
        }
        else {
            $(element).tooltip('hide');
        }
    },
    options: {
        ariaDescribedbyID: "send-ariaDescribedbyID",
        placement: "bottom",
        trigger: "manual",
        template: '<div class="tooltip customtooltip" role="tooltip"><div class="tooltip-arrow error-tooltip-arrow"></div><div class="tooltip-inner error-tooltip "></div></div>',
        html: true
    }
};
var NumOFBsModalOpen = 0;
ko.bindingHandlers.BsModal = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if (value == true) {
            NumOFBsModalOpen++;
            $(element).modal('show');
        }
        else {
            NumOFBsModalOpen--;
            $(element).modal('hide');
            if (NumOFBsModalOpen != 0)
                $('body').addClass('modal-open');
        }
    }
};
ko.bindingHandlers.customPlaceholder = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var local = ko.utils.unwrapObservable(valueAccessor());
        var opt = {};
        ko.utils.extend(opt, ko.bindingHandlers.customPlaceholder.options);
        ko.utils.extend(opt, local);
        var reqSign = '';
        if (opt['required']) {
            reqSign = '*';
        }
        $(element).attr("placeholder", ko.utils.unwrapObservable(opt['placeholder']) + reqSign);
    },
    update: function (element, valueAccessor) {
    },
    opt: {
        required: false,
        placeholder: '',
    }
};
