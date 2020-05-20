// 框架

$(function () {
  let requestData = {};

  const configStyle = styles => {
    if (styles) {
      const style = document.createElement('style');
      const head = document.getElementById('kj_head');
      style.innerHTML = styles;
      head.appendChild(style);
    }
  };

  const runFunc = (componentId, funcName, ...rest) => {
    try {
      var result = window[componentId + '_' + funcName](...rest);
      return result;
    } catch (err) {}
  };

  const ajaxRequest = (url, data, callback) => {
    $.getJSON(url, data, function (json) {
      if (json.status === 200) {
        if (callback && typeof callback === 'function') {
          callback(json);
        }
      } else {
        console.error(json);
      }
    });
  };

  const dispatchEvent = (componentId, funcName, ...rest) => {
    runFunc(componentId, funcName, ...rest);
  };

  // 检查 没有参数传递 检测全部 有参数传递检测该id为componentId的组件
  const check = componentId => {
    let isOk = true;
    if (componentId) {
      isOk = runFunc(componentId, 'check');
      return isOk;
    }

    requestData.components.map(item => {
      if (item.form) {
        const ok = runFunc(item.id, 'check');
        if (!ok) {
          isOk = false;
        }
      }
    });
    return isOk;
  };

  const changeSize = (componentId, style) => {
    $('#' + componentId + '_wrapper').css(style);
  };

  const getData = () => {
    var resultData = {};
    requestData.components.map(item => {
      if (item.form) {
        resultData[item.id] = runFunc(item.id, 'getData');
      }
    });
    return resultData;
  };

  const submit = url => {
    var isOk = check(); // 验证数据是否为空

    if (!isOk) {
      console.log('提交时 有失败校验。。。');
      return;
    }
    //  获取数据
    let resultData = getData();

    $.post(url, JSON.stringify(resultData), result => {
      console.log('提交数据成功', result);
    });

    // 组件内部提交
    // requestData.components.map(item => {
    //   runFunc(item.id, 'submit');
    // });
  };

  const initInputValue = (componentId, ...rest) => {
    runFunc(componentId, 'setData', ...rest);
  };

  const main = (url, data) => {
    requestData = {
      style: '',
      components: [
        {
          id: 'yhc01',
          form: true,
        },
        {
          id: 'yhc02',
          form: false,
        },
        {
          id: 'yhc03',
          form: true,
        },
        {
          id: 'yhc04',
          form: true,
        },
        {
          id: 'yhc05',
          form: true,
        },
        {
          id: 'yhc06',
          form: false,
        },
        {
          id: 'yhc07',
          form: true,
        },
        {
          id: 'yhc08',
          form: false,
        },
        {
          id: 'yhc09',
          form: false,
        },
        {
          id: 'yhc10',
          form: false,
        },
      ],
    };
    configStyle(requestData.style);
    ajaxRequest(url, data, res => {
      // requestData = res
      // configStyle(requestData.style);
    });
  };

  window.TA505 = {
    submit,
    check,
    changeSize,
    ajaxRequest,
    main,
    getData,
    initInputValue,
    dispatchEvent,
  };
});

