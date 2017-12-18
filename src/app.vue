<template>
  <div id="app">
    <f7-views>
      <f7-view main>
        <f7-pages>
          <f7-page>
            <div class="table-time">
              <div class="table-time-blank"></div>
              <div class="table-time-morning">上<br>午</div>
              <div class="table-time-morning">下<br>午</div>
              <div class="table-time-evening">晚<br>上</div>
            </div>
            <table class="table-course">
              <thead class="table-border">
                <tr>
                  <th>一</th>
                  <th>二</th>
                  <th>三</th>
                  <th>四</th>
                  <th>五</th>
                  <th>六</th>
                  <th>日</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="table-item table-item-invalid" data-day="1" data-no="1">
                      <div>嵌入式系统基础</div>
                      <div>新2-408</div>
                    </div>
                  </td>
                  <td>
                    <div class="table-item table-item-2">
                      <div>软件工程经济学</div>
                      <div>新1-409</div>
                    </div>
                  </td>
                  <td>
                    <div class="table-item table-item-3" data-day="3" data-no="1">
                      <div>软件工程经济学</div>
                      <div>新1-410</div>
                    </div>
                  </td>
                  <td><div class="table-item table-item-4">
                    <div>演讲与写作</div>
                    <div>新4-304</div>
                  </div>
                  </td>
                  <td><div class="table-item table-item-5" data-day="5" data-no="1">
                    <div>软件设计与体系结构C</div>
                    <div>新2-402</div>
                  </div>
                  </td>
                  <td>
                    <div class="table-item table-item-null"></div>
                  </td>
                  <td>
                    <div class="table-item table-item-null"></div>
                  </td>
                </tr>
                <tr class="table-border">
                  <td>
                    <div class="table-item table-item-invalid" data-day="1" data-no="2">
                      <div>马克思主义基本原理</div>
                      <div>新1-408</div>
                    </div>
                  </td>
                  <td>
                    <div class="table-item table-item-null"></div>
                  </td>
                  <td>
                    <div class="table-item table-item-invalid" data-day="3" data-no="2">
                      <div>马克思主义基本原理</div>
                      <div>新1-405</div>
                    </div>
                  </td>
                  <td>
                    <div class="table-item table-item-4" data-day="4" data-no="2">
                      <div>软件需求工程C</div><div>新3-313</div></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>

    <!-- 弹窗 -->
    <f7-popup id="popup">
      <f7-view navbar-fixed>
        <f7-pages>
          <f7-page>
            <f7-navbar title="Popup">
              <f7-nav-right>
                <f7-link close-popup>Close</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
          </f7-page>
        </f7-pages>
      </f7-view>
    </f7-popup>
  </div>
</template>

<script>
  export default {}
</script>