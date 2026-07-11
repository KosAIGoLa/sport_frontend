<template>
  <div class="guess-panel">
    <div class="guess-header">
      <h3>投注记录</h3>
      <button type="button" class="complaint-btn">投诉</button>
    </div>
    <div class="guess-table-wrap">
      <table class="guess-table">
        <thead>
          <tr>
            <th>投注时间</th>
            <th>趣猜主题</th>
            <th>出题主播</th>
            <th>投注选项</th>
            <th>投注金额</th>
            <th>盈亏</th>
          </tr>
        </thead>
        <tbody>
          <EmptyTableRow :colspan="6" text="--暂无投注记录--" />
        </tbody>
      </table>
    </div>
  </div>
</template>
