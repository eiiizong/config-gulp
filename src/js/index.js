// 框架

$(function () {

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
  /**
   * 
   * @param {String} componentId 组件id
   * @param {String} funcName 函数名 [setData|getData|queryData]
   * @param  {...any} rest 执行函数所带参数
   */
  const dispatchEvent = (componentId, funcName, ...rest) => {
    runFunc(componentId, funcName, ...rest);
  };

  const postEvent = (obj) => {
    if(!obj && !obj.id) {
      return false
    }

    configData.components.map(item => {
      if(item.id === obj.id) {
        item.relationship.map(item2 => {
          runFunc(item2.id, item2.eventName);
        })
      }
    })
  };

  // 检查 没有参数传递 检测全部 有参数传递检测该id为componentId的组件
  const check = componentId => {
    let isOk = true;
    if (componentId) {
      isOk = runFunc(componentId, 'checkData');
      if(!isOk) {
        alert('校验失败')
      }
      return isOk;
    }

    configData.components.map(item => {
      if (item.form) {
        const ok = runFunc(item.id, 'checkData');
        if (!ok) {
          isOk = false;
        }
      }
    });
    if(!isOk) {
      alert('校验失败')
    }
    return isOk;
  };

  const changeSize = (componentId, style) => {
    $('#' + componentId + '_wrapper').css(style);
  };

  const getData = () => {
    var resultData = {};
    configData.components.map(item => {
      if (item.form) {
        resultData[item.che050] = {};
        resultData[item.che050].id = item.id;
        resultData[item.che050].data = runFunc(item.id, 'getData');
      }
    });
    return resultData;
  };

  const submit = () => {
    var isOk = check(); // 验证数据是否为空

    if (!isOk) {
      console.log('提交时 有失败校验。。。');
      return;
    }
    //  获取数据
    let resultData = getData();

    // $.post(configData.url, resultData, result => {
    //   console.log('提交数据成功', result);
    // });
    $.ajax({
      url: configData.url,
      type: 'POST',
      data: JSON.stringify(resultData),
      contentType: 'application/json',
      success: function(res) {
        console.log('提交成功', res)
      }
    })

    // 组件内部提交
    // configData.components.map(item => {
    //   runFunc(item.id, 'submit');
    // });
  };

  const initInputValue = (componentId, ...rest) => {
    runFunc(componentId, 'setData', ...rest);
  };

  const main = () => {
    configStyle(configData.style);
  };
  const init = (...rest) => {
    configData.components.map(item => {
      if (item.form) {
        resultData[item.id] = runFunc(item.id, 'initData', ...rest);
      }
    });
  };
  window.TA505 = {
    submit,
    check,
    changeSize,
    ajaxRequest,
    main,
    init,
    getData,
    initInputValue,
    dispatchEvent,
    postEvent
  };
});

