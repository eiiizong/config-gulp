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
        if(callback && typeof callback === 'function') {
          callback(json)
        }
      } else {
        callback(json)
        console.error(json)
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
      const ok = runFunc(item.id, 'check');
      if (!ok) {
        isOk = false;
      }
    });
    return isOk;
  };

  const changeSize = (componentId, style) => {
    $('#' + componentId + '_wrapper').css(style);
  };

  const submit = url => {
    var isOk = check(); // 验证数据是否为空
    let resultData = [];
    if (!isOk) {
      return;
    }
    requestData.components.map(item => {
      resultData[item.id] = runFunc(item.id, 'getData');
    });
    $.post({
      url: url,
      // 此处需要告知传递参数类型为JSON，不能缺少
      contentType: 'application/json',
      // 将JSON转化为字符串传递
      data: JSON.stringify(resultData),
      // 成功后的方法
      success: function (result) {
        console.log('提交数据成功', result);
      },
    });
  };
  const getData = () => {
    var resultData = {};
    requestData.components.map(item => {
      resultData[item.id] = runFunc(item.id, 'getData');
    });
    return resultData;
  };
  const initInputValue = (componentId, ...rest) => {
    runFunc(componentId, 'setData', ...rest);
  };
  const main = (url, data) => {
    ajaxRequest(url,data, (res) => {
      // requestData = res
      requestData = {
        style: '#kj_app {background-color: #f00}',
        components: [
          {
            id: 'yhc01',
          },
          {
            id: 'yhc02',
          },
          {
            id: 'yhc03',
          },
          {
            id: 'yhc04',
          },
          {
            id: 'yhc05',
          },
          {
            id: 'yhc06',
          },
          {
            id: 'yhc07',
          },
          {
            id: 'yhc08',
          },
          {
            id: 'yhc09',
          },
          {
            id: 'yhc10',
          },
        ],
      }
      configStyle(requestData.style);
    })
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
