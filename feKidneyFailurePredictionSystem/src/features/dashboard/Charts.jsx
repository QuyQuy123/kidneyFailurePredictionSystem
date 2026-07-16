export function TrendChart({ points = '8,24 48,39 89,32 130,50 171,73 212,62 253,66 294,81 335,76 376,93 417,97 458,111 500,106 542,125' }) {
  return <div className="chart"><div className="chart__axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><svg viewBox="0 0 550 145" preserveAspectRatio="none" aria-label="Biểu đồ xu hướng điểm nguy cơ"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5e6ad2" stopOpacity=".24"/><stop offset="1" stopColor="#5e6ad2" stopOpacity="0"/></linearGradient></defs><path className="chart-grid" d="M0 18H550M0 50H550M0 82H550M0 114H550"/><polygon points={`${points} 542,140 8,140`} fill="url(#area)"/><polyline points={points} fill="none" stroke="#7783f2" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg><div className="chart__dates"><span>20/04</span><span>27/04</span><span>04/05</span><span>11/05</span><span>18/05</span></div></div>
}

export function BarsChart() {
  const bars = [45, 56, 76, 64, 78, 56, 45]
  return <div className="bars" aria-label="Biểu đồ dự đoán theo tuần">{bars.map((height, index) => <div className="bars__item" key={height + index}><span style={{height: `${height}%`}}/><i>{12 + index}/05</i></div>)}<svg viewBox="0 0 700 150" preserveAspectRatio="none"><polyline points="30,110 135,90 240,54 345,83 450,60 555,97 670,118" fill="none" stroke="#a2a9fa" strokeWidth="3"/></svg></div>
}

export function RiskDonut() {
  return <div className="donut-wrap"><div className="donut"><div><strong>18.726</strong><span>Tổng dự đoán</span></div></div><div className="legend"><span><i className="low"/>Nguy cơ thấp <b>73.9%</b></span><span><i className="medium"/>Nguy cơ trung bình <b>20.9%</b></span><span><i className="high"/>Nguy cơ cao <b>5.2%</b></span></div></div>
}
