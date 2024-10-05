"use client"

import HeatMap from "@/components/HeatMap";
import { useGetUserDetail } from "@/react-query/hooks/useGetUserDetail";
import { useGetUsers } from "@/react-query/hooks/useGetUsers";
import { Avatar } from "@mui/material";
import { ParentSize } from "@visx/responsive";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


export default function Home() {
	const [selectedUser, setSelectedUser] = useState("")
	const {usersData} = useGetUsers();
	const {userDetailData} = useGetUserDetail(selectedUser);
	const [dataToRender, setDataToRender] = useState([]);

	useEffect(() => {
		if(userDetailData){
			const bins = userDetailData?.data?.data?.skillset?.reduce((acc, curr) => {
				return [...acc, ...curr.skills]
			}, []);

			const arr = [...dataToRender];
			const index = arr.findIndex(x => x.bin === userDetailData.id)
			if(index === -1){
				arr.push({
					bin: userDetailData?.id,
					name: userDetailData?.name,
					bins
				})

				setDataToRender(arr);
			}
		}
	}, [userDetailData])

	return (
		<div className="p-3 min-h-screen">
			<div className="flex justify-between items-center mb-3 px-6">
				<h2 className="text-3xl text-slate-500">Title</h2>
				<p>{usersData?.length} candidates</p>
			</div>
			<div className="flex gap-x-5">
				<div className="border-2 border-black w-[280px]">
					<p className="text-center p-3 font-medium text-lg border-b-2 border-black">Most recommended</p>
					<ul>
						{
							usersData?.map((user) => 
								<li key={user.id} 
									onClick={() => setSelectedUser(user.id)}
									className="flex gap-x-2 items-center py-3 px-2 justify-center hover:cursor-pointer border-b border-black"
								>
									<Avatar
										alt=""
										src=""
										sx={{ width: 24, height: 24 }}
										>
										{user.name.split("")[0]}
									</Avatar>
									<p>{user.name}</p>
									<CiCirclePlus className="text-purple-500" />
								</li>
							)
						}
					</ul>
				</div>
				<div className="flex-1">
					<div className="border-b border-black flex justify-between mb-5">
						<div className="flex items-end">
							<button className="bg-green-600 text-white p-2 text-sm capitalize">
								Compare view
							</button>
						</div>
						<div className="flex gap-x-2 items-center mb-1">
							<button className="p-3 bg-white border border-black shadow-custom">
								<FaArrowLeftLong />
							</button>
							<button className="p-3 bg-white border border-black shadow-custom">
								<FaArrowRightLong />
							</button>
						</div>
					</div>
					<div className="w-full h-[600px]">
						<ParentSize>{({ width, height }) => <HeatMap width={width} height={height} data={dataToRender} />}</ParentSize>
					</div>
				</div>
			</div>
		</div>
	);
}
