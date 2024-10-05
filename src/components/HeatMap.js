import { Group } from "@visx/group";
import { HeatmapRect } from "@visx/heatmap";
import { scaleLinear, scaleOrdinal } from "@visx/scale";

const color0 = '#ffffff';
const color1 = '#faf0ca';
const color2 = '#16db65';
const color3 = '#058c42';
const color4 = '#04471c';
export const background = '#ffffff';

// accessors
const bins = (d) => d.bins;

function max(data, value) {
    return Math.max(...data.map(value));
}

const defaultMargin = { top: 10, left: 10, right: 10, bottom: 10 };

function HeatMap({
  width,
  height,
  events = true,
  data,
  margin = defaultMargin,
}) {

    const bucketSizeMax = max(data, (d) => bins(d).length);

    // scales
    const xScale = scaleLinear({
        domain: [0, data.length],
    });
    const yScale = scaleLinear({
        domain: [0, bucketSizeMax],
    });

    const rectColorScale = scaleOrdinal({
        domain: [0,4],
        range: [color0, color1, color2, color3, color4]
    });

	// bounds
	const size =
		width > margin.left + margin.right ? width - margin.left - margin.right : width;
	const xMax = size;
	const yMax = height - margin.bottom - margin.top;

	const binWidth = xMax / data.length;
	const binHeight = yMax / bucketSizeMax;


	xScale.range([230, xMax]);
	yScale.range([margin.bottom, yMax + margin.top]);

	return width < 10 ? null : (
		<svg width={width} height={height}>
			<rect x={0} y={0} width={width} height={height} rx={14} fill={background} />
			<Group top={margin.top} left={margin.left}>
				<HeatmapRect
					data={data}
					xScale={(d) => xScale(d) ?? 0}
					yScale={(d) => yScale(d) ?? 0}
					colorScale={rectColorScale}
					binWidth={binWidth}
					binHeight={binHeight}
                    count={(bin) => bin?.pos[0]?.consensus_score}
					gap={5}
				>
					{(heatmap) =>
						heatmap.map((heatmapBins) =>
							heatmapBins.map((bin) => {
                                return(
								<rect
									key={`heatmap-rect-${bin.row}-${bin.column}`}
									className="visx-heatmap-rect"
									width={bin.width}
									height={bin.height}
									x={bin.x}
									y={bin.y}
									fill={bin.color}
									onClick={() => {
										if (!events) return;
										const { row, column } = bin;
										alert(JSON.stringify({ row, column, name: bin?.bin?.name, score: bin?.bin?.pos[0]?.consensus_score }));
									}}
								/>
							)}),
						)
					}
				</HeatmapRect>
                {
                    data?.map((item, index) =>
                        <text
                            key={item.id}
                            x={xScale(index)}
                            y={10} // Adjust y position for labels
                            textAnchor="left"
                            fill="black"
                            fontSize={14}
                            fontWeight={500}
                        >
                            {item.name.split(" ")[0]}
                        </text>
                    )
                }
                {
                    data[0]?.bins?.map((item, index) =>
                        <text
                            key={item.id}
                            x={-10}
                            y={yScale(index)+22} // Adjust y position for labels
                            textAnchor="left"
                            fill="black"
                            fontSize={12}
                            fontWeight={500}
                        >
                            {item.name}
                        </text>
                    )
                }
			</Group>
		</svg>
	);
}

export default HeatMap;