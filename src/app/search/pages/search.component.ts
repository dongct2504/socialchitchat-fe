import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppUserDto } from '../../shared/models/appUserDtos/appUserDto';
import { faRefresh, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/home/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm = {} as FormGroup;
  searchResults: AppUserDto[] = [];
  isLoading = false;
  isClickSearch = false;

  faSearch = faSearch;
  faRefresh = faRefresh;

  constructor(private fb: FormBuilder, private userService: UserService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.searchForm = this.fb.group({
      name: ['']
    });
  }

  onSearch() {
    this.isClickSearch = true;
    const name = this.searchForm.get('name')?.value;
    if (name) {
      this.isLoading = true;
      this.userService.search(name).subscribe(users => {
        this.searchResults = users;
        this.isLoading = false;
      });
    }
  }

  onRefresh() {
    this.isClickSearch = false;
    this.searchResults = [];
    this.searchForm.reset();
  }
}
