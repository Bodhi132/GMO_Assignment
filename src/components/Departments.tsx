import { useState } from 'react';
import { List, ListItem, ListItemText, Collapse, ListItemIcon, Checkbox } from '@mui/material';

interface Department {
  department: string;
  sub_departments: string[];
}

const departments: Department[] = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success']
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design']
  }
];

const Departments = () => {
  const [open, setOpen] = useState<string | null>(null);
  const [checked, setChecked] = useState<string[]>([]);

  const handleClick = (department: string) => {
    setOpen(open === department ? null : department);
  };

  const handleToggle = (value: string) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleToggleAll = (department: Department) => {
    if (department.sub_departments.every((sub) => checked.includes(sub))) {
      setChecked(checked.filter((value) => !department.sub_departments.includes(value)));
    } else {
      setChecked([...checked, ...department.sub_departments.filter((sub) => !checked.includes(sub))]);
    }
  };

  return (
    <>
      <List>
        {departments.map((department) => (
          <div key={department.department}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={department.sub_departments.every((sub) => checked.includes(sub))}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': `checkbox-list-label-${department.department}` }}
                  onChange={() => handleToggleAll(department)}
                />
              </ListItemIcon>
              <ListItemText primary={department.department} />
              <ListItemIcon onClick={() => handleClick(department.department)} style={{ cursor: 'pointer', fontSize: "2rem" }}>
                {open === department.department ? '-' : '+'}
              </ListItemIcon>
            </ListItem>
            <Collapse in={open === department.department} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {department.sub_departments.map((subDepartment) => (
                  <ListItem key={subDepartment} style={{ paddingLeft: 30 }}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.includes(subDepartment)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': `checkbox-list-label-${subDepartment}` }}
                        onChange={() => handleToggle(subDepartment)}
                      />
                    </ListItemIcon>
                    <ListItemText primary={subDepartment} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </>
  );
}

export default Departments