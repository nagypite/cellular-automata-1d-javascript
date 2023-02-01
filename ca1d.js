
class CellularAutomaton1D
{
	constructor()
	{
        this._CurrentState = [];
        this._NextState = [];
        this._NumberOfCells = 32;
        this._Rule = 0;
        this._BoundaryCircular = true;
        this._BoundaryCells = [];
        this._StateChangedEventHandlers = [];
        this._NumberOfCellsChangedEventHandlers = [];
    }

    //---------------------------------------------------
    // PROPERTIES
    //---------------------------------------------------

	get StateChangedEventHandlers() { return this._StateChangedEventHandlers; }

	get NumberOfCellsChangedEventHandlers() { return this._NumberOfCellsChangedEventHandlers; }

	get CurrentState() { return this._CurrentState; }

	get NextState() { return this._NextState; }

	get Rule() { return this._Rule; }
	set Rule(Rule) { this._Rule = Rule; }

	get BoundaryCircular() { return this._BoundaryCircular; }
	set BoundaryCircular(BoundaryCircular) { this._BoundaryCircular = BoundaryCircular; }

	get BoundaryCells() { return this._BoundaryCells; }
	set BoundaryCells(BoundaryCells) { this._BoundaryCells = BoundaryCells; }

	get NumberOfCells() { return this._NumberOfCells; }
	set NumberOfCells(NumberOfCells)
    {
        this._NumberOfCells = NumberOfCells;
        this.FireNumberOfCellsChangedEvent();
    }

    //-------------------------------------------------------------------
    // METHODS
    //-------------------------------------------------------------------

    FireStateChangedEvent(edit)
    {
        this._StateChangedEventHandlers.every(function (Handler) { Handler(edit); });
    }

    FireNumberOfCellsChangedEvent()
    {
        this._NumberOfCellsChangedEventHandlers.every(function (Handler) { Handler(); });
    }

    Randomize()
    {
        for (let i = 0; i < this._NumberOfCells; i++)
        {
            this._CurrentState[i] = parseInt(Math.random() * 2);
        }

        this.FireStateChangedEvent();
    }

    InitializeValue(initValue)
    {
        let initAsBinary = '';
        if (initValue.length) {
            if (initValue.length == this._NumberOfCells) {
                initAsBinary = initValue;
            }
            else {
                initAsBinary = parseInt(initValue).toString(2);
            }
        }
        else {
            initAsBinary = ''.padStart(this._NumberOfCells, '0');
        }

        for (let i = 0; i < this._NumberOfCells; i++)
        {
            this._CurrentState[i] = initAsBinary[i] || '0';
        }

        this.FireStateChangedEvent();
    }

    InitializeToCentre()
    {
        for (let i = 0; i < this._NumberOfCells; i++)
        {
            this._CurrentState[i] = 0;
        }

        this._CurrentState[Math.floor(this._NumberOfCells / 2)] = 1;

        this.FireStateChangedEvent();
    }

    CalculateNextState()
    {
        let PrevCellState;
        let NextCellState;
        let Neighbourhood;
        let RuleAsBinary = this._Rule.toString(2);

        // left pad binary to 8
        while (RuleAsBinary.length < 8)
            RuleAsBinary = "0" + RuleAsBinary;

        console.log('rule', RuleAsBinary);

        for (let i = 0; i < this._NumberOfCells; i++)
        {
            if (i == 0)
                PrevCellState = this._BoundaryCircular ? this._CurrentState[this._NumberOfCells - 1] : this._BoundaryCells[0];
            else
                PrevCellState = this._CurrentState[i - 1];

            if (i == (this._NumberOfCells - 1))
                NextCellState = this._BoundaryCircular ? this._CurrentState[0] : this._BoundaryCells[1];
            else
                NextCellState = this._CurrentState[i + 1];

            Neighbourhood = PrevCellState.toString() + this._CurrentState[i].toString() + NextCellState.toString();

            switch (Neighbourhood)
            {
                case "111":
                    this._NextState[i] = RuleAsBinary[0];
                    break;
                case "110":
                    this._NextState[i] = RuleAsBinary[1];
                    break;
                case "101":
                    this._NextState[i] = RuleAsBinary[2];
                    break;
                case "100":
                    this._NextState[i] = RuleAsBinary[3];
                    break;
                case "011":
                    this._NextState[i] = RuleAsBinary[4];
                    break;
                case "010":
                    this._NextState[i] = RuleAsBinary[5];
                    break;
                case "001":
                    this._NextState[i] = RuleAsBinary[6];
                    break;
                case "000":
                    this._NextState[i] = RuleAsBinary[7];
                    break;
            }
        }

        for (let i = 0; i < this._NumberOfCells; i++)
        {
            this._CurrentState[i] = this._NextState[i];
        }

        this._NextState.length = 0;

        this.FireStateChangedEvent();
    }

    Iterate(Iterations)
    {
        for(let Iteration = 1; Iteration <= Iterations; Iteration++)
        {
            this.CalculateNextState();
        }
    }

    ToggleCell(cellId)
    {
        this._CurrentState[cellId] = this._CurrentState[cellId] == '0' ? '1' : '0';
        this.FireStateChangedEvent(true);
    }
}
