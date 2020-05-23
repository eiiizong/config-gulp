// 框架

(function () {
  // 所有组件注册过来的事件
  let componentEvents = [];

  /**
   *
   * @param {String} componentId 组件名
   * @param {String} funcName 函数名
   * @param  {...any} rest 执行函数所带参数
   */
  const runFunc = (componentId, funcName, ...rest) => {
    let target = {};
    componentEvents.map(item => {
      if (item.id === componentId) {
        target = item;
      }
    });

    if (target.events && target.id) {
      const type = typeof target.events[funcName];
      if (type === 'function') {
        var result = target.events[funcName](...rest);
        return result;
      } else {
        console.warn(
          `检测到${componentId}组件中定义的${funcName}不是一个函数，请定义为函数！！！`
        );
      }
    } else {
      console.warn(
        `检测到${componentId}组件尚未将其方法或者id注入到框架中，请在${componentId}组件中调用TA505.register方法注入！！！`
      );
    }
  };

  const configStyle = styles => {
    if (styles) {
      const style = document.createElement('style');
      const head = document.getElementById('kj_head');
      style.innerHTML = styles;
      head.appendChild(style);
    }
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

  /**
   * 发起事件执行
   * @param {Object} obj
   * obj = {
   *    // 事件名
   *    event: 'getData',
   *    // 调用事件时传递的参数
   *    data: {}
   * }
   */

  const postEvent = obj => {
    if (!obj && !obj.event) {
      return false;
    }
    configData.components.map(item => {
      item.relationship.map(item2 => {
        if (item2.event === obj.event) {
          runFunc(item2.id, item2.event, obj.data);
        }
      });
    });
  };

  // 检查 没有参数传递 检测全部 有参数传递检测该id为componentId的组件
  const check = componentId => {
    let isOk = true;
    if (componentId) {
      isOk = runFunc(componentId, 'checkData');
      if (!isOk) {
        alert('校验失败');
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
    if (!isOk) {
      alert('校验失败');
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

    // 数据提交请求
    $.ajax({
      url: configData.url,
      type: 'POST',
      data: JSON.stringify(resultData),
      contentType: 'application/json',
      success: function (res) {
        console.log('提交成功', res);
      },
    });
  };

  const initInputValue = (componentId, ...rest) => {
    runFunc(componentId, 'setData', ...rest);
  };

  const main = () => {
    configStyle(configData.style);
  };
  const init = (...rest) => {
    configData.components.map(item => {
      if (item.init) {
        resultData[item.id] = runFunc(item.id, 'initData', ...rest);
      }
    });
  };

  // 注册
  const register = obj => {
    const objEvents = obj.events;
    const checkObj = () => {
      if (!obj.id) {
        console.warn(`组件向框架注入事件时未携带组件id`);
        return;
      }
      if (!objEvents.getData || typeof objEvents.getData !== 'function') {
        console.warn(
          `检测到${obj.id}组件注入的对象中未定义events.getData 或者 events.getData 不是一个函数。请更改后重新注入！！！`
        );
      }
      if (!objEvents.setData || typeof objEvents.setData !== 'function') {
        console.warn(
          `检测到${obj.id}组件注入的对象中未定义events.setData 或者 events.setData 不是一个函数。请更改后重新注入！！！`
        );
      }
      if (!objEvents.checkData || typeof objEvents.checkData !== 'function') {
        console.warn(
          `检测到${obj.id}组件注入的对象中未定义events.checkData 或者 events.checkData 不是一个函数。请更改后重新注入！！！`
        );
      }
      if (!objEvents.queryData || typeof objEvents.queryData !== 'function') {
        console.warn(
          `检测到${obj.id}组件注入的对象中未定义events.queryData 或者 events.queryData 不是一个函数。请更改后重新注入！！！`
        );
      }
      if (!objEvents.initData || typeof objEvents.initData !== 'function') {
        console.warn(
          `检测到${obj.id}组件注入的对象中未定义events.initData 或者 events.initData 不是一个函数。请更改后重新注入！！！`
        );
      }
    };
    checkObj();
    let isExist = false;
    componentEvents.map(item => {
      if (item.id === obj.id) {
        isExist = true;
        item.events = Object.assign({}, obj.events);
      }
    });
    if (!isExist) {
      componentEvents.push(obj);
    }
  };

  window.TA505 = {
    submit,
    check,
    changeSize,
    main,
    init,
    getData,
    initInputValue,
    dispatchEvent,
    postEvent,
    register,
  };
})();
