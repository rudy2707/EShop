function Camera()
{
	// Init angles
	this.phi = 0;
	this.theta = 0;

	this.orientation = [1, 0, 0];	// Initial orientation
	this.vAxis = [0, 1, 0];			// Vertical axis = y

	this.lateralMove = [0, 0, 0]	// Directional vector
	this.position = [0, 1.5, 0];	// Initial position

	this.targetPoint = [1, 0, 0]

	this.sensivity = 0.5;			// Mouse sensivity
	this.speed = 0.05;				// Displacement speed

	this.setOrientation = function(orientation) {
		this.orientation = orientation;
		this.targetPoint[0] = this.position[0] + orientation[0];
		this.targetPoint[1] = this.position[1] + orientation[1];
		this.targetPoint[2] = this.position[2] + orientation[2];
	};

	this.setPosition = function(position) {
		this.position = position;
		this.targetPoint[0] = this.position[0] + this.orientation[0];
		this.targetPoint[1] = this.position[1] + this.orientation[1];
		this.targetPoint[2] = this.position[2] + this.orientation[2];
	};

	this.move = function(distances) {
		this.setPosition([
			this.position[0] + distances[0],
			this.position[1] + distances[1],
			this.position[2] + distances[2]
		]);
	};

	this.orientate = function(relX, relY)
	{
		this.theta -= (relX * this.sensivity);	// Compute theta angle from mouse x delta
		this.phi -= (relY * this.sensivity);	// Compute phi angle from mouse y delta

		if(this.phi > 89.0)		// Limit max angle to 89 to avoid division by 0
			this.phi = 89.0;

		if(this.phi < -89)		// Same for opposite
			this.phi = -89;

		var radPhi = this.phi * Math.PI / 180;		// Convert to radians
		var radTheta = this.theta * Math.PI / 180;

		// Vertical-axis-proof way to compute polar orientation from phi/theta
		if(this.vAxis[0])
		{
			this.orientation[0] = Math.sin(radPhi);
			this.orientation[1] = Math.cos(radPhi) * Math.cos(radTheta);
			this.orientation[2] = Math.cos(radPhi) * Math.sin(radTheta);
		}
		else if(this.vAxis[1])	// This one for y-axis
		{
			this.orientation[0] = Math.cos(radPhi) * Math.sin(radTheta);
			this.orientation[1] = Math.sin(radPhi);
			this.orientation[2] = Math.cos(radPhi) * Math.cos(radTheta);
		}
		else
		{
			this.orientation[0] = Math.cos(radPhi) * Math.cos(radTheta);
			this.orientation[1] = Math.cos(radPhi) * Math.sin(radTheta);
			this.orientation[2] = Math.sin(radPhi);
		}


		// Compute normal vector for lateral moves
		var cross = [];
		cross[0] = this.vAxis[1] * this.orientation[2] - this.vAxis[2] * this.orientation[1];
		cross[1] = this.vAxis[2] * this.orientation[0] - this.vAxis[0] * this.orientation[2];
		cross[2] = this.vAxis[0] * this.orientation[1] - this.vAxis[1] * this.orientation[0];

		var lateralMove = new Vector3(cross);
		lateralMove.normalize();

		this.lateralMove = [lateralMove.elements[0], lateralMove.elements[1], lateralMove.elements[2]]

		// set orientation
		this.targetPoint[0] = this.position[0] + this.orientation[0];
		this.targetPoint[1] = this.position[1] + this.orientation[1];
		this.targetPoint[2] = this.position[2] + this.orientation[2];
	}


	this.displace = function()
	{
		// Compute mouse if needed
		if(inputs.mouseMoves() == true)
		{
			this.orientate(inputs.relX, inputs.relY);
		}

		// Compute position for forward key
		if(inputs.keys[inputs.keyCodes["forward"]])
		{
			var norm = Math.sqrt(Math.pow(this.orientation[0], 2.0) + Math.pow(this.orientation[2], 2.0))

			this.position[0] += ((this.orientation[0] / norm) * this.speed);
			this.position[2] += ((this.orientation[2] / norm) * this.speed);

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}

		// Compute position for left key
		if(inputs.keys[inputs.keyCodes["left"]])
		{
			this.position[0] += (this.lateralMove[0] * this.speed);
			this.position[2] += (this.lateralMove[2] * this.speed);

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}

		// Compute position for backward key
		if(inputs.keys[inputs.keyCodes["backward"]])
		{
			this.position[0] -= (this.orientation[0] * this.speed);
			this.position[2] -= (this.orientation[2] * this.speed);

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}

		// Compute position for right key
		if(inputs.keys[inputs.keyCodes["right"]])
		{
			this.position[0] -= this.lateralMove[0] * this.speed;
			this.position[2] -= this.lateralMove[2] * this.speed;

			this.targetPoint[0] = this.position[0] + this.orientation[0];
			this.targetPoint[1] = this.position[1] + this.orientation[1];
			this.targetPoint[2] = this.position[2] + this.orientation[2];
		}
	}


	// Compute view matrix
	this.lookAt = function()
	{
		view.setLookAt(	this.position[0], this.position[1], this.position[2],
			   			this.targetPoint[0], this.targetPoint[1], this.targetPoint[2],
						this.vAxis[0], this.vAxis[1], this.vAxis[2]);
	}


	// Define a specific target point and re-compute orientation from relative position
	this.setTargetPoint = function(targetPoint)
	{
		var x = targetPoint[0] - this.position[0];
		var y = targetPoint[1] - this.position[1];
		var z = targetPoint[2] - this.position[2];

		var orientation = new Vector3([x, y, z]);

		orientation.normalize();
		this.orientation[0] = orientation.elements[0];
		this.orientation[1] = orientation.elements[1];
		this.orientation[2] = orientation.elements[2];


		if(this.vAxis[0])
		{
			this.phi = Math.asin(this.orientation[0]);
			this.theta = Math.acos(this.orientation[1] / Math.cos(this.phi));

			if(this.orientation[1] < 0)
			{
				this.theta *= -1;
			}
		}
		else if(this.vAxis[1])
		{
			this.phi = Math.asin(this.orientation[1]);
			this.theta = Math.acos(this.orientation[2] / Math.cos(this.phi));

			if(this.orientation[2] < 0)
			{
				this.theta *= -1;
			}
		}
		else
		{
			this.phi = Math.asin(this.orientation[0]);
			this.theta = Math.acos(this.orientation[2] / Math.cos(this.phi));

			if(this.orientation[2] < 0)
			{
				this.theta *= -1;
			}
		}

		this.phi *= (180 / Math.PI);
		this.theta *= (180 / Math.PI);
	}
}
