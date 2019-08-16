
export class TaskNode {
	guid: string;
	name: string;
	children: TaskNode[];
	value?: string;

	copyTn(tn: TaskNode) : TaskNode {
		var tnNew = new TaskNode();
		tnNew.name = tn.name;
		tnNew.value = tn.value;
		tnNew.children = [];
		return tnNew;
	}

};
