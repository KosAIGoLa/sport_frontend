<template>
  <div class="order-panel">
    <div class="order-table-wrap">
      <table class="order-table">
        <thead>
          <tr>
            <th>下单时间</th>
            <th>订单编号</th>
            <th>商品名称</th>
            <th>方式</th>
            <th>价格</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody>
          <EmptyTableRow :colspan="6" text="--暂无消费记录--" />
        </tbody>
      </table>
    </div>
  </div>
</template>
